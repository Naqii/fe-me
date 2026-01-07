import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import useChangeUrl from "../useChangeUrl";
import assetServices from "@/services/asset.service";
import { IAsset } from "@/types/Asset";

const useAssetGuest = () => {
  const router = useRouter();
  const { currentSearch } = useChangeUrl();

  const getAsset = async () => {
    let params = ``;
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
    refetch: refetchAssets,
  } = useQuery({
    queryKey: ["Asset", currentSearch],
    queryFn: () => getAsset(),
    enabled: router.isReady,
  });

  const displayAsset: IAsset[] = useMemo(() => {
    return (dataAsset?.data ?? []).filter(
      (asset: IAsset) => asset.isShow === true,
    );
  }, [dataAsset]);

  return {
    dataAsset,
    displayAsset,
    isLoadingAsset,
    refetchAssets,
  };
};

export default useAssetGuest;
