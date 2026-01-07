import { DateValue } from "@heroui/react";

interface IWork {
  _id?: string;
  title?: string;
  content?: string;
  description?: string;
  isShow?: string | boolean;
  dateFinished?: string | DateValue;
  thumbnail?: {
    url: string;
    publicId: string;
    resourceType: string;
  };
}

interface IWorkForm extends IWork {
  url?: string;
  publicId?: string;
  resourceType?: string;
}

export type { IWork, IWorkForm };
