interface IVideo {
  _id?: string;
  title?: string;
  thumbnail?: string | FileList;
  video?: string | FileList;
  isShow?: boolean | string;
}

export type { IVideo };
