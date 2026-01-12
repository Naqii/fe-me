import { ToasterContext } from "@/contexts/ToasterContext";
import { useContext } from "react";
import * as yup from "yup";
import useMediaHandling from "../useMediaHandling";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { ICategory } from "@/types/Category";
import categoryServices from "@/services/category.services";

const schema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  icon: yup
    .object({
      url: yup.string().required(),
      publicId: yup.string().required(),
      resourceType: yup.string().oneOf(["image", "video", "raw"]).required(),
    })
    .required("Please upload icon"),
});

const useAddCategoryModal = () => {
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
  const preview = watch("icon")?.url;
  const fileUrl = getValues("icon");

  const handleUploadIcon = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (data) => {
      setValue(
        "icon",
        {
          url: data.url,
          publicId: data.publicId,
          resourceType: data.resourceType as "image" | "video" | "raw",
        },
        { shouldValidate: true },
      );
    });
  };

  const handleDeleteIcon = (
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

  const addCategory = async (payload: ICategory) => {
    const res = await categoryServices.addCategory(payload);
    return res;
  };

  const {
    mutate: mutateAddCategory,
    isPending: isPendingMutateAddCategory,
    isSuccess: isSuccessMutateAddCategory,
  } = useMutation({
    mutationFn: addCategory,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error?.message || "An error occurred",
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Success add Category",
      });
      reset();
    },
  });

  const handleAddCategory = (data: ICategory) => mutateAddCategory(data);

  return {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleAddCategory,
    isPendingMutateAddCategory,
    isSuccessMutateAddCategory,
    preview,
    handleUploadIcon,
    isPendingMutateUploadFile,
    handleDeleteIcon,
    isPendingMutateDelete,
    handleOnClose,
  };
};

export default useAddCategoryModal;
