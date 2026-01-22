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

  const downloadAsset = async () => {
    if (!query.id) return;

    const response = await assetServices.getAssetArchiveById(`${query.id}`);

    const blob = new Blob([response.data], {
      type: response.headers["content-type"],
    });

    const url = window.URL.createObjectURL(blob);

    const filename =
      response.headers["content-disposition"]
        ?.split("filename=")[1]
        ?.replaceAll('"', "") || `${dataAsset?.asset?.publicId}.zip`;

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();

    window.URL.revokeObjectURL(url);
  };

  return {
    dataAsset,
    isLoadingAsset,
    downloadAsset,
  };
};

export default useDetailAssetGuest;
