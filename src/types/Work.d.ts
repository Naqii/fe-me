import { DateValue } from "@heroui/react";

interface IWork {
  _id?: string;
  title?: string;
  thumbnail?: string | FileList;
  content?: string;
  description?: string;
  isShow?: boolean | string;
  dateFinished?: string | DateValue;
}

export type { IWork };
