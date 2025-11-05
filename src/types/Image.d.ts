interface IImage {
  _id?: string;
  title?: string;
  isShow?: boolean | string;
  image?: string | FileList;
}

export type { IImage };
