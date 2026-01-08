import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext } from "react";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ToasterContext } from "@/contexts/ToasterContext";
import imageServices from "@/services/image.services";
import { IImage } from "@/types/Image";
import useMediaHandling from "../../useMediaHandling";

const schema = yup.object({
  title: yup.string().required("Title is required"),
  isShow: yup.string().required("Status is required"),
  image: yup
    .object({
      url: yup.string().required(),
      publicId: yup.string().required(),
      resourceType: yup
        .mixed<"image" | "video" | "raw">()
        .oneOf(["image", "video", "raw"])

        .required(),
    })
    .nullable()
    .required("Please upload image"),
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

  const form = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const { setValue, getValues, watch } = form;

  // eslint-disable-next-line react-hooks/incompatible-library
  const preview = watch("image")?.url;

  const { data: dataImage } = useQuery<IImage>({
    queryKey: ["image-detail", query.id],
    enabled: isReady && !!query.id,
    queryFn: async () => {
      const { data } = await imageServices.getImageById(`${query.id}`);
      return data.data;
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (payload: IImage) => {
      const { data } = await imageServices.updateImage(
        String(query.id),
        payload,
      );
      return data.data;
    },
    onSuccess: () => {
      setToaster({ type: "success", message: "Image updated successfully" });
    },
    onError: (error) => {
      setToaster({
        type: "error",
        message: error?.message || "Failed to update image",
      });
    },
  });

  const handleUploadImage = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (data) => {
      setValue(
        "image",
        {
          url: data.url,
          publicId: data.publicId,
          resourceType: data.resourceType,
        },
        { shouldValidate: true },
      );
    });
  };

  const handleDeleteImage = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    const image = getValues("image");

    if (!image?.publicId || !image?.resourceType) return;

    handleDeleteFile(
      {
        publicId: image.publicId,
        resourceType: image.resourceType,
      },
      () => onChange(undefined),
    );
  };

  return {
    dataImage,
    form,
    preview,
    handleUploadImage,
    handleDeleteImage,
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,
    ...updateMutation,
  };
};

export default useDetailImage;
