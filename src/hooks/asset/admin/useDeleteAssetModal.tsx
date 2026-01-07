import { ToasterContext } from "@/contexts/ToasterContext";
import assetServices from "@/services/asset.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteAssetModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteAsset = async (id: string) => {
    const res = await assetServices.deleteAsset(id);

    return res;
  };

  const {
    mutate: mutateDeleteAsset,
    isPending: isPendingMutateDeleteAsset,
    isSuccess: isSuccessMutateDeleteAsset,
  } = useMutation({
    mutationFn: deleteAsset,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Asset Deleted",
      });
    },
  });

  return {
    mutateDeleteAsset,
    isPendingMutateDeleteAsset,
    isSuccessMutateDeleteAsset,
  };
};

export default useDeleteAssetModal;
