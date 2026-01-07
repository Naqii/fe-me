interface IImage {
  _id?: string;
  title?: string;
  isShow?: boolean | string;
  image?: {
    url: string;
    publicId: string;
    resourceType: string;
  };
}

interface IImageForm extends IImage {
  url?: string;
  publicId?: string;
  resourceType?: string;
}

export type { IImage, IImageForm };
