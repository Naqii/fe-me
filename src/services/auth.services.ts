import instance from "@/libs/axios/instance";
import { ILogin } from "@/types/Auth";
import endpoint from "./endpoint.constant";

const authServices = {
  login: (payload: ILogin) => instance.post(`${endpoint.AUTH}/login`, payload),

  getProfileWithToken: (token: string) =>
    instance.get(`${endpoint.AUTH}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  getProfile: () => instance.get(`${endpoint.AUTH}/me`),
};

export default authServices;
