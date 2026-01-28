import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IShorten } from "@/types/Shorten";

const shortenServices = {
  makeShort: (payload: IShorten) => instance.post(endpoint.SHORTEN, payload),
  getShort: (params?: string) => instance.get(`${endpoint.SHORTEN}?${params}`),
};

export default shortenServices;
