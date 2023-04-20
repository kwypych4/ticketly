export const AttachmentSchemaType = {
  type: [
    {
      type: {
        type: String,
        required: true,
      },
      path: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
    },
  ],
  required: false,
};

export type AttachmentType = { type: string; path: string; title: string }[];
