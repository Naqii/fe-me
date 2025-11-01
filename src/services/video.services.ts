import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IVideo } from "@/types/Video";

const videoServices = {
  getVideo: (params?: string) => instance.get(`${endpoint.VID}?${params}`),
  getVideoById: (id: string) => instance.get(`${endpoint.VID}/${id}`),
  addVideo: (payload: IVideo) => instance.post(endpoint.VID, payload),
  deleteVideo: (id: string) => instance.delete(`${endpoint.VID}/${id}`),
  updateVideo: (id: string, payload: IVideo) =>
    instance.put(`${endpoint.VID}/${id}`, payload),
};

export default videoServices;
