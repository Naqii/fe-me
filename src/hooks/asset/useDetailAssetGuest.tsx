import assetServices from "@/services/asset.services";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useDetailAssetGuest = () => {
  const { query, isReady } = useRouter();

  const getAssetById = async () => {
    const { data } = await assetServices.getAssetById(`${query.id}`);
    return data.data;
  };

  const { data: dataAsset, isLoading: isLoadingAsset } = useQuery({
    queryKey: ["Asset", query.id],
    queryFn: getAssetById,
    enabled: isReady,
  });

  return {
    dataAsset,
    isLoadingAsset,
  };
};

export default useDetailAssetGuest;
