import { useRouter } from "next/router";
import { useState } from "react";
import useChangeUrl from "../useChangeUrl";
import imageServices from "@/services/image.services";
import { useQuery } from "@tanstack/react-query";

const useImage = () => {
  const [selectedId, setSelectedId] = useState<string>("");
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

  return {
    dataImage,
    isLoadingImage,
    isRefetchingImage,
    refetchImages,

    selectedId,
    setSelectedId,
  };
};

export default useImage;
