import { HttpError } from 'error';
import { NextFunction, Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import path from 'path';
import { slugify } from 'utils';

export const uploadFile =
  ({ apiKeyName }: { apiKeyName: string }) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.files) return next();

    const uploadPath = (fileName: string) => `${path.join(process.cwd(), 'src')}/attachments/${fileName}`;

    if ((req.files[apiKeyName] as UploadedFile[]).length > 1) {
      const uploadedFiles = req.files[apiKeyName] as UploadedFile[];
      const areAcceptedTypes = uploadedFiles.some(
        (file) => file.mimetype === 'image/png' || file.mimetype === 'image/jpg'
      );
      if (!areAcceptedTypes) throw new HttpError(403, 'You can send only jpg/png format files.');

      uploadedFiles.map((file) => {
        const fileName = file.md5 + file.size + slugify(file.name);

        return file.mv(uploadPath(fileName), (err) => {
          if (err) throw new HttpError(500, err);
        });
      });

      return next();
    }

    const uploadedFile = req.files[apiKeyName] as UploadedFile;
    const fileName = uploadedFile.md5 + uploadedFile.size + slugify(uploadedFile.name);

    if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpg') {
      uploadedFile.mv(uploadPath(fileName), (err) => {
        if (err) throw new HttpError(500, err);
      });

      return next();
    }

    throw new HttpError(403, 'You can send only jpg/png format files.');
  };
