import useChangeUrl from "@/hooks/useChangeUrl";
import assetServices from "@/services/asset.services";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useAssetAdmin = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const router = useRouter();
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const getAsset = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    const res = await assetServices.getAsset(params);
    const { data } = res;
    return data;
  };

  const {
    data: dataAsset,
    isLoading: isLoadingAsset,
    isRefetching: isRefetchingAsset,
    refetch: refetchAssets,
  } = useQuery({
    queryKey: ["Asset", currentPage, currentLimit, currentSearch],
    queryFn: () => getAsset(),
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  return {
    dataAsset,
    isLoadingAsset,
    isRefetchingAsset,
    refetchAssets,

    selectedId,
    setSelectedId,
  };
};

export default useAssetAdmin;
