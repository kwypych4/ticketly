import { HttpError } from 'error';
import { Request } from 'express';
import fileUpload from 'express-fileupload';
import { CommentSchema, UserSchema } from 'models';
import moment from 'moment';
import { AttachmentType, CommentType, UserType } from 'types';
import { errorHandler, slugify } from 'utils';

type CommentsRequest = Request;

type CommentsResponse = CommentType[];

const getComments = errorHandler<CommentsRequest, CommentsResponse>(async (req, _) => {
  const limit = Number(req.query.limit) || 25;
  const page = Number(req.query.page) || 1;

  const comments = await CommentSchema.find<CommentType>({ ticket: req.params.ticketId })
    .limit(limit)
    .skip((page - 1) * limit)
    .sort({ created: -1 });

  if (!comments) throw new HttpError(400, 'There are no comments for this ticket');

  const data = await Promise.all(
    comments.map(async ({ _id, ownerId, created, updated, content, ticket, attachments }) => {
      const commentOwner = await UserSchema.findOne<UserType>({ _id: ownerId });

      return {
        id: _id?.toString(),
        ownerId,
        ownerName: `${commentOwner?.firstName} ${commentOwner?.lastName}`,
        created,
        updated,
        content,
        ticket,
        attachments,
      };
    })
  );

  return data;
});

type CreateCommentRequest = {
  body: Omit<CommentType, 'attachments'>;
} & Request;

type CreateCommentResponse = {
  success: boolean;
};

const createComment = errorHandler<CreateCommentRequest, CreateCommentResponse>(async (req, _) => {
  const comment = new CommentSchema({
    owner: req.session?.userId,
    ticket: req.params.ticketId,
    content: req.body.content,
  });

  if (req.files) {
    if ((req.files.attachments as fileUpload.UploadedFile[]).length > 1) {
      const files = req.files.attachments as fileUpload.UploadedFile[];
      const names: AttachmentType = [];

      files.map((file) =>
        names.push({
          type: file.mimetype,
          path: `/attachments/${file.md5 + file.size + slugify(file.name)}`,
          title: file.name,
        })
      );

      comment.attachments = names;
    } else {
      const file = req.files.attachments as fileUpload.UploadedFile;

      comment.attachments = [
        { type: file.mimetype, path: `/attachments/${file.md5 + file.size + slugify(file.name)}`, title: file.name },
      ];
    }
  }

  await comment.save();

  return { success: true };
});

type DeleteCommentRequest = Request;

type DeleteCommentResponse = { success: boolean };

const deleteComment = errorHandler<DeleteCommentRequest, DeleteCommentResponse>(async (req, _) => {
  await CommentSchema.deleteOne({ _id: req.params.id });

  return {
    success: true,
  };
});

type UpdateCommentRequest = {
  body: {
    content: string;
  };
} & Request;

type UpdateCommentResponse = { success: boolean };

const updateComment = errorHandler<UpdateCommentRequest, UpdateCommentResponse>(async (req, _) => {
  const { content } = req.body;

  const updateParams = {
    $set: {
      updated: moment().toISOString(),
      content,
    },
  };

  const comment = await CommentSchema.updateOne<CommentType>({ _id: req.params.id }, updateParams);

  if (!comment) throw new HttpError(400, 'Comment not found');

  return {
    success: true,
  };
});

export const comments = {
  getComments,
  createComment,
  deleteComment,
  updateComment,
};
