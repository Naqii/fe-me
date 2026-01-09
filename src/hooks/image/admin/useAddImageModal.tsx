import { ToasterContext } from "@/contexts/ToasterContext";
import { useContext } from "react";
import * as yup from "yup";
import useMediaHandling from "../../useMediaHandling";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { IImage } from "@/types/Image";
import imageServices from "@/services/image.services";
import { useMutation } from "@tanstack/react-query";

const schema = yup.object().shape({
  title: yup.string().required(),
  isShow: yup.string().required(),
  image: yup
    .object({
      url: yup.string().required(),
      publicId: yup.string().required(),
      resourceType: yup.string().oneOf(["image", "video", "raw"]).required(),
    })
    .required("Please upload image"),
});

const useAddImageModal = () => {
  const { setToaster } = useContext(ToasterContext);
  const {
    isPendingMutateUploadFile,
    isPendingMutateDelete,
    handleDeleteFile,
    handleUploadFile,
  } = useMediaHandling();

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
    watch,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const preview = watch("image")?.url;
  const fileUrl = getValues("image");

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
          resourceType: data.resourceType as "image" | "video" | "raw",
        },
        { shouldValidate: true },
      );
    });
  };

  const handleDeleteImage = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleDeleteFile(fileUrl, () => onChange(undefined));
  };

  const handleOnClose = (onClose: () => void) => {
    handleDeleteFile(fileUrl, () => {
      reset();
      onClose();
    });
  };

  const addImage = async (payload: IImage) => {
    const res = await imageServices.addImage(payload);
    return res;
  };

  const {
    mutate: mutateAddImage,
    isPending: isPendingMutateAddImage,
    isSuccess: isSuccessMutateAddImage,
  } = useMutation({
    mutationFn: addImage,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error?.message || "An error occurred",
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Success add Image",
      });
      reset();
    },
  });

  const handleAddImage = (data: IImage) => mutateAddImage(data);

  return {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleAddImage,
    isPendingMutateAddImage,
    isSuccessMutateAddImage,
    preview,
    handleUploadImage,
    isPendingMutateUploadFile,
    handleDeleteImage,
    isPendingMutateDelete,
    handleOnClose,
  };
};

export default useAddImageModal;
