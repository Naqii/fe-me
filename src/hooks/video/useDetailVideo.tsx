import { ToasterContext } from "@/contexts/ToasterContext";
import videoServices from "@/services/video.services";
import { IVideo } from "@/types/Video";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateInfo = yup.object().shape({
  title: yup
    .string()
    .max(100, "Name cannot exceed 100 characters")
    .required("Please input name"),
  isShow: yup.string().required("Please select status"),
  video: yup.string().required("Please input name"),
});

const useDetailVideo = () => {
  const { query, isReady } = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schemaUpdateInfo),
  });

  const getVideoById = async () => {
    const { data } = await videoServices.getVideoById(`${query.id}`);
    return data.data;
  };

  const { data: dataVideo, refetch: refetchVideo } = useQuery({
    queryKey: ["Video"],
    queryFn: getVideoById,
    enabled: isReady,
  });

  const updateVideo = async (payload: IVideo) => {
    const { data } = await videoServices.updateVideo(`${query.id}`, payload);
    return data.data;
  };

  const {
    mutate: mutateUpdateVideo,
    isPending: isPendingMutateUpdateVideo,
    isSuccess: isSuccessMutateUpdateVideo,
  } = useMutation({
    mutationFn: (payload: IVideo) => updateVideo(payload),
    onError: (error) => {
      setToaster({
        type: "error",
        message: error?.message || "An error occurred",
      });
    },
    onSuccess: () => {
      refetchVideo();
      setToaster({
        type: "success",
        message: "Success update Video",
      });
    },
  });

  const handleUpdateVideo = (data: IVideo) => mutateUpdateVideo(data);

  return {
    dataVideo,

    handleUpdateVideo,
    isPendingMutateUpdateVideo,
    isSuccessMutateUpdateVideo,

    control,
    handleSubmit,
    errors,
    reset,
    setValue,
  };
};

export default useDetailVideo;
