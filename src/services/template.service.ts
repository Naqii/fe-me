import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IType } from "@/types/Type";

const templateServices = {
  getTemplate: (params?: string) =>
    instance.get(`${endpoint.TEMPLATE}?${params}`),
  getTemplateById: (id: string) => instance.get(`${endpoint.TEMPLATE}/${id}`),
  addTemplate: (payload: IType) => instance.post(endpoint.TEMPLATE, payload),
  deleteTemplate: (id: string) => instance.delete(`${endpoint.TEMPLATE}/${id}`),
  updateTemplate: (id: string, payload: IType) =>
    instance.put(`${endpoint.TEMPLATE}/${id}`, payload),
};

export default templateServices;
