import { DateValue } from "@heroui/react";

interface IAsset {
  _id?: string;
  title?: string;
  category?: string;
  isShow?: string | boolean;
  updated?: string | DateValue;
  thumbnail?: {
    url: string;
    publicId: string;
    resourceType: string;
  };
  asset?: {
    url: string;
    publicId: string;
    resourceType: string;
  };
}

interface IAssetForm extends IAsset {
  url?: string;
  publicId?: string;
  resourceType?: string;
}

export type { IAsset, IAssetForm };
