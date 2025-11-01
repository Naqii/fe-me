interface IImage {
  _id?: string;
  title?: string;
  image?: string | FileList;
  isShow?: boolean | string;
}

export type { IImage };
