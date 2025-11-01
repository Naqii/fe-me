import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IFileURL } from "@/types/File";

const formdataHeader = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

const uploadServices = {
  singlePict: (payload: FormData) =>
    instance.post(`${endpoint.MEDIA}/single-pict`, payload, formdataHeader),
  singleVid: (payload: FormData) =>
    instance.post(`${endpoint.MEDIA}/single-vid`, payload, formdataHeader),
  deleteFile: (payload: IFileURL) =>
    instance.delete(`${endpoint.MEDIA}/remove`, { data: payload }),
};

export default uploadServices;
