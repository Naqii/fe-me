import { ToasterContext } from "@/contexts/ToasterContext";
import assetServices from "@/services/asset.service";
import { IAsset } from "@/types/Asset";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

const useDetailAsset = () => {
  const { query, isReady } = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const getAssetById = async () => {
    const { data } = await assetServices.getAssetById(`${query.id}`);
    return data.data;
  };

  const { data: dataAsset, refetch: refetchAssets } = useQuery({
    queryKey: ["Asset"],
    queryFn: getAssetById,
    enabled: isReady,
  });

  const updateAsset = async (payload: IAsset) => {
    const { data } = await assetServices.updateAsset(`${query.id}`, payload);
    return data.data;
  };

  const {
    mutate: mutateUpdateAsset,
    isPending: isPendingMutateUpdateAsset,
    isSuccess: isSuccessMutateUpdateAsset,
  } = useMutation({
    mutationFn: (payload: IAsset) => updateAsset(payload),
    onError: (error) => {
      setToaster({
        type: "error",
        message: error?.message || "An error occured",
      });
    },
    onSuccess: () => {
      refetchAssets();
      setToaster({
        type: "success",
        message: "Success update Asset",
      });
    },
  });

  const handleUpdateAsset = (data: IAsset) => mutateUpdateAsset(data);

  return {
    dataAsset,

    handleUpdateAsset,

    isPendingMutateUpdateAsset,
    isSuccessMutateUpdateAsset,
  };
};

export default useDetailAsset;
