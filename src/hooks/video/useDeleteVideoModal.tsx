import { ToasterContext } from "@/contexts/ToasterContext";
import videoServices from "@/services/video.services";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteVideoModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteVideo = async (id: string) => {
    const res = await videoServices.deleteVideo(id);

    return res;
  };

  const {
    mutate: mutateDeleteVideo,
    isPending: isPendingMutateDeleteVideo,
    isSuccess: isSuccessMutateDeleteVideo,
  } = useMutation({
    mutationFn: deleteVideo,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Video Deleted",
      });
    },
  });

  return {
    mutateDeleteVideo,
    isPendingMutateDeleteVideo,
    isSuccessMutateDeleteVideo,
  };
};

export default useDeleteVideoModal;
