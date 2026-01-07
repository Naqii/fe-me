import { DateValue } from "@heroui/react";

interface IAsset {
  _id?: string;
  title?: string;
  thumbnail?: string | FileList;
  asset?: string | FileList;
  type?: string;
  isShow?: string | boolean;
  updated?: string | DateValue;
}

export type { IAsset };
