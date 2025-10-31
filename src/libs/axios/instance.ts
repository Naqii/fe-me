import environment from "@/config/environment";
import { SessionExtended } from "@/types/Auth";
import axios from "axios";
import { getSession, signOut } from "next-auth/react";

const headers = {
  "Content-Type": "application/json",
};

const instance = axios.create({
  baseURL: environment.API_URL,
  headers,
  timeout: 30 * 1000,
});

instance.interceptors.request.use(
  async (request) => {
    let token: string | undefined;
    if (
      process.env.NODE_ENV === "development" &&
      process.env.NEXT_PUBLIC_USE_MOCK_SESSION === "true"
    ) {
      token = process.env.MOCK_ACCESS_TOKEN;
    } else {
      const session: SessionExtended | null = await getSession();
      token = session?.accessToken;
    }
    if (token) request.headers.Authorization = `Bearer ${token}`;
    return request;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;

    if (status === 401) {
      console.warn("Token expired, Logging out...");
      await signOut({ redirect: true, callbackUrl: "/auth/login" });
    }
    return Promise.reject(error);
  },
);

export default instance;
