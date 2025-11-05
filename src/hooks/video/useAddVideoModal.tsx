import { ToasterContext } from "@/contexts/ToasterContext";
import { useContext } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IVideo } from "@/types/Video";
import videoServices from "@/services/video.services";
import { useMutation } from "@tanstack/react-query";

const schema = yup.object().shape({
  title: yup.string().required("Please input title"),
  isShow: yup.string().required("Please chose one"),
  video: yup.string().required("Please input video link"),
});

const useAddVideoModal = () => {
  const { setToaster } = useContext(ToasterContext);
  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const addVideo = async (payload: IVideo) => {
    const res = await videoServices.addVideo(payload);
    return res;
  };

  const {
    mutate: mutateAddVideo,
    isPending: isPendingMutateAddVideo,
    isSuccess: isSuccessMutateAddVideo,
  } = useMutation({
    mutationFn: addVideo,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error?.message || "An error occurred",
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Success add Video",
      });
      reset();
    },
  });

  const handleAddVideo = (data: IVideo) => mutateAddVideo(data);

  return {
    control,
    errors,
    reset,
    setValue,
    handleAddVideo,
    handleSubmitForm,
    isPendingMutateAddVideo,
    isSuccessMutateAddVideo,
  };
};

export default useAddVideoModal;
