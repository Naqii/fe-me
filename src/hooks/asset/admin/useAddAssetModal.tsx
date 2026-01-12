import { ToasterContext } from "@/contexts/ToasterContext";
import { useContext } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import useMediaHandling from "../../useMediaHandling";
import { toDateStandard } from "@/utils/date";
import { DateValue } from "@heroui/react";
import { IAsset } from "@/types/Asset";
import assetServices from "@/services/asset.services";
import { useRouter } from "next/router";
import categoryServices from "@/services/category.services";

const schema = Yup.object().shape({
  title: Yup.string()
    .max(100, "Name cannot exceed 100 characters")
    .required("Please input name"),
  category: Yup.string().required("Please chose description"),
  isShow: Yup.string().required("Please select status"),
  updated: Yup.mixed<DateValue>().required("Please select lastes update"),
  thumbnail: Yup.object({
    url: Yup.string().required(),
    publicId: Yup.string().required(),
    resourceType: Yup.string().oneOf(["image"]).required(),
  }).required("Please upload image"),
  asset: Yup.object({
    url: Yup.string().required(),
    publicId: Yup.string().required(),
    resourceType: Yup.string().oneOf(["raw"]).required(),
  }).required("Please upload file"),
});

const useAddAssetModal = () => {
  const { setToaster } = useContext(ToasterContext);
  const router = useRouter();

  const {
    isPendingMutateUploadFile,
    isPendingMutateUploadAsset,
    isPendingMutateDelete,

    handleUploadFile,
    handleUploadArchive,
    handleDeleteFile,
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
  const previewThumbnail = watch("thumbnail")?.url;
  const fileUrlThumbnail = getValues("thumbnail");

  const handleUploadThumbnail = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (data) => {
      setValue(
        "thumbnail",
        {
          url: data.url,
          publicId: data.publicId,
          resourceType: data.resourceType as "image",
        },
        { shouldValidate: true },
      );
    });
  };

  const previewAsset = watch("asset")?.url;
  const fileUrlAsset = getValues("asset");

  const handleUploadAsset = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadArchive(files, onChange, (data) => {
      setValue(
        "asset",
        {
          url: data.url,
          publicId: data.publicId,
          resourceType: data.resourceType as "raw",
        },
        { shouldValidate: true },
      );
    });
  };

  const handleDelete = (onChange: (files: FileList | undefined) => void) => {
    const fileUrlThumbnail = getValues("thumbnail");
    const fileUrlAsset = getValues("asset");
    handleDeleteFile(fileUrlThumbnail || fileUrlAsset, () =>
      onChange(undefined),
    );
  };

  const handleOnClose = (onClose: () => void) => {
    handleDeleteFile(fileUrlThumbnail || fileUrlAsset, () => {
      reset();
      onClose();
    });
  };

  const { data: dataCategory } = useQuery({
    queryKey: ["category"],
    queryFn: () => categoryServices.getCategory(),
    enabled: router.isReady,
  });

  const addAsset = async (payload: IAsset) => {
    const res = await assetServices.addAsset(payload);
    return res;
  };

  const {
    mutate: mutateAddAsset,
    isPending: isPendingMutateAddAsset,
    isSuccess: isSuccessMutateAddAsset,
  } = useMutation({
    mutationFn: addAsset,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error?.message || "An error occurred",
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Success add Asset",
      });
      reset();
    },
  });

  const handleAddAsset = (data: IAsset) => {
    const payload = {
      ...data,
      updated: toDateStandard(data.updated as DateValue),
    };
    mutateAddAsset(payload);
  };

  return {
    dataCategory,
    control,
    errors,
    handleAddAsset,
    handleSubmitForm,
    isPendingMutateAddAsset,
    isSuccessMutateAddAsset,

    isPendingMutateUploadFile,
    isPendingMutateUploadAsset,
    isPendingMutateDelete,

    previewThumbnail,
    handleUploadThumbnail,

    previewAsset,
    handleUploadAsset,

    handleDelete,
    handleOnClose,
  };
};

export default useAddAssetModal;
