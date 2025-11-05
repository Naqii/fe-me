import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext } from "react";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ToasterContext } from "@/contexts/ToasterContext";
import imageServices from "@/services/image.services";
import { IImage } from "@/types/Image";
import useMediaHandling from "../useMediaHandling";

const schema = yup.object({
  title: yup
    .string()
    .max(100, "Title cannot exceed 100 characters")
    .required("Please input title"),
  isShow: yup.string().required("Please select status"),
  image: yup.mixed<FileList | string>().required("Please upload an image"),
});

type FormValues = yup.InferType<typeof schema>;

const useDetailImage = () => {
  const { query, isReady } = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const {
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,
    handleUploadFile,
    handleDeleteFile,
  } = useMediaHandling();

  const { data: dataImage, refetch } = useQuery<IImage>({
    queryKey: ["Image", query.id],
    queryFn: async () => {
      const { data } = await imageServices.getImageById(`${query.id}`);
      return data.data;
    },
    enabled: isReady,
  });

  const updateMutation = useMutation({
    mutationFn: async (payload: IImage) => {
      const { data } = await imageServices.updateImage(`${query.id}`, payload);
      return data.data;
    },
    onError: (error) =>
      setToaster({
        type: "error",
        message: error?.message || "An error occurred",
      }),
    onSuccess: () => {
      refetch();
      setToaster({ type: "success", message: "Success update Image" });
    },
  });

  const form = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const preview = form.watch("image");
  const fileUrl = form.getValues("image");

  const handleUploadImage = (
    files: FileList,
    onChange: (val?: FileList | string) => void,
  ) => {
    handleUploadFile(
      files,
      onChange,
      (url) => url && form.setValue("image", url),
    );
  };

  const handleDeleteImage = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleDeleteFile(fileUrl, () => onChange(undefined));
  };

  return {
    dataImage,
    form,
    handleUploadImage,
    handleDeleteImage,
    preview,
    ...updateMutation,
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,
  };
};

export default useDetailImage;
