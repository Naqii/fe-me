import { useQuery } from "@tanstack/react-query";
import imageServices from "@/services/image.services";
import { IImage } from "@/types/Image";
import useChangeUrl from "../useChangeUrl";
import { useRouter } from "next/router";

const normalizeIsShow = (value: unknown): boolean => {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") return value === "true";
  return false;
};

const useImageGuest = () => {
  const router = useRouter();
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const getImage = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    const res = await imageServices.getImage(params);
    const { data } = res;
    return data;
  };

  const {
    data: dataImage,
    isLoading: isLoadingImage,
    isRefetching: isRefetchingImage,
    refetch: refetchImages,
  } = useQuery({
    queryKey: ["Image", currentPage, currentLimit, currentSearch],
    queryFn: () => getImage(),
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  const visibleImages =
    dataImage?.data?.filter((img: IImage) => normalizeIsShow(img.isShow)) ?? [];

  return {
    visibleImages,
    isLoadingImage,
    isRefetchingImage,
    refetchImages,
  };
};

export default useImageGuest;
