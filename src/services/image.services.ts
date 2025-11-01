import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IImage } from "@/types/Image";

const imageServices = {
  getImage: (params?: string) => instance.get(`${endpoint.IMG}?${params}`),
  getImageById: (id: string) => instance.get(`${endpoint.IMG}/${id}`),
  addImage: (payload: IImage) => instance.post(endpoint.IMG, payload),
  deleteImage: (id: string) => instance.delete(`${endpoint.IMG}/${id}`),
  updateImage: (id: string, payload: IImage) =>
    instance.put(`${endpoint.IMG}/${id}`, payload),
};

export default imageServices;
