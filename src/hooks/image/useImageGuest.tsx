import { useQuery } from "@tanstack/react-query";
import imageServices from "@/services/image.services";
import { IImage } from "@/types/Image";

interface ImageResponse {
  data: IImage[];
  pagination: {
    totalPages: number;
  };
}

const normalizeIsShow = (value: unknown): boolean => {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") return value === "true";
  return false;
};

const useImageGuest = () => {
  const query = useQuery<ImageResponse>({
    queryKey: ["images"],
    queryFn: async () => {
      const res = await imageServices.getImage();

      return {
        ...res.data,
        data: res.data.data.map((img: IImage) => ({
          ...img,
          isShow: normalizeIsShow(img.isShow),
        })),
      };
    },
  });

  const visibleImages = query.data?.data.filter((img) => img.isShow) ?? [];

  return {
    dataImage: query.data,
    images: visibleImages,
    isLoadingImage: query.isLoading,
    isRefetchingImage: query.isRefetching,
  };
};

export default useImageGuest;
