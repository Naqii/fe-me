import { useQuery } from "@tanstack/react-query";
import assetServices from "@/services/asset.services";
import { IAsset } from "@/types/Asset";

interface AssetResponse {
  data: IAsset[];
  pagination: {
    totalPages: number;
  };
}

const normalizeIsShow = (value: unknown): boolean => {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") return value === "true";
  return false;
};

const useAssetGuest = () => {
  const query = useQuery<AssetResponse>({
    queryKey: ["asset"],
    queryFn: async () => {
      const res = await assetServices.getAsset();

      return {
        ...res.data,
        data: res.data.data.map((asset: IAsset) => ({
          ...asset,
          isShow: normalizeIsShow(asset.isShow),
        })),
      };
    },
  });

  const visibleAssets = query.data?.data.filter((asset) => asset.isShow) ?? [];

  return {
    dataAsset: query.data,
    assets: visibleAssets,
    isLoadingAsset: query.isLoading,
    isRefetchingAsset: query.isRefetching,
  };
};

export default useAssetGuest;
