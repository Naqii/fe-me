import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IFile } from "@/types/File";

const formdataHeader = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

const uploadServices = {
  singlePict: (payload: FormData) =>
    instance.post(`${endpoint.MEDIA}/single-pict`, payload, formdataHeader),
  singleArch: (payload: FormData) =>
    instance.post(`${endpoint.MEDIA}/single-arch`, payload, formdataHeader),
  deleteFile: (payload: Pick<IFile, "publicId" | "resourceType">) =>
    instance.delete(`${endpoint.MEDIA}/remove`, {
      data: payload,
    }),
};

export default uploadServices;
