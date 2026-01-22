import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IAsset } from "@/types/Asset";

const assetServices = {
  getAsset: (params?: string) => instance.get(`${endpoint.ASSET}?${params}`),
  getAssetById: (id: string) => instance.get(`${endpoint.ASSET}/${id}`),
  getAssetArchiveById: (id: string) =>
    instance.get(`${endpoint.ASSET}/${id}/download`),
  addAsset: (payload: IAsset) => instance.post(endpoint.ASSET, payload),
  deleteAsset: (id: string) => instance.delete(`${endpoint.ASSET}/${id}`),
  updateAsset: (id: string, payload: IAsset) =>
    instance.put(`${endpoint.ASSET}/${id}`, payload),
};

export default assetServices;
