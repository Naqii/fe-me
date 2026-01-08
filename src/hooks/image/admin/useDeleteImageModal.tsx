import { ToasterContext } from "@/contexts/ToasterContext";
import imageServices from "@/services/image.services";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteImageModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteImage = async (id: string) => {
    const res = await imageServices.deleteImage(id);

    return res;
  };

  const {
    mutate: mutateDeleteImage,
    isPending: isPendingMutateDeleteImage,
    isSuccess: isSuccessMutateDeleteImage,
  } = useMutation({
    mutationFn: deleteImage,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Image Deleted",
      });
    },
  });

  return {
    mutateDeleteImage,
    isPendingMutateDeleteImage,
    isSuccessMutateDeleteImage,
  };
};

export default useDeleteImageModal;
