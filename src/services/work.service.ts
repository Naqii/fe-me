import instance from "@/libs/axios/instance";
import { IWork } from "@/types/Work";
import endpoint from "./endpoint.constant";

const workServices = {
  getWork: (params?: string) => instance.get(`${endpoint.WORK}?${params}`),
  getWorkById: (id: string) => instance.get(`${endpoint.WORK}/${id}`),
  addWork: (payload: IWork) => instance.post(endpoint.WORK, payload),
  deleteWork: (id: string) => instance.delete(`${endpoint.WORK}/${id}`),
  updateWork: (id: string, payload: IWork) =>
    instance.put(`${endpoint.WORK}/${id}`, payload),
};

export default workServices;
