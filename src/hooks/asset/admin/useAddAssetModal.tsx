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
import assetServices from "@/services/asset.service";
import templateServices from "@/services/template.service";
import { useRouter } from "next/router";

const schema = Yup.object().shape({
  title: Yup.string()
    .max(100, "Name cannot exceed 100 characters")
    .required("Please input name"),
  thumbnail: Yup.mixed<FileList | string>().required(
    "Please upload an thumbnail",
  ),
  asset: Yup.mixed<FileList | string>().required("Please upload an asset"),
  type: Yup.string().required("Please chose description"),
  isShow: Yup.string().required("Please select status"),
  updated: Yup.mixed<DateValue>().required("Please select lastes update"),
});

const useAddAssetModal = () => {
  const { setToaster } = useContext(ToasterContext);
  const router = useRouter();

  const {
    isPendingMutateUploadArchive,
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,

    handleDeleteFile,
    handleUploadArchive,
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
  const previewThumbnail = watch("thumbnail");
  const fileUrlThumbnail = getValues("thumbnail");

  const handleUploadThumbnail = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        setValue("thumbnail", fileUrl);
      }
    });
  };

  const previewAsset = watch("asset");
  const fileUrlAsset = getValues("asset");

  const handleUploadAsset = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadArchive(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        setValue("asset", fileUrl);
      }
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

  const { data: dataType } = useQuery({
    queryKey: ["template"],
    queryFn: () => templateServices.getTemplate(),
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
    dataType,
    control,
    errors,
    handleAddAsset,
    handleSubmitForm,
    isPendingMutateAddAsset,
    isSuccessMutateAddAsset,

    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,
    isPendingMutateUploadArchive,

    previewThumbnail,
    handleUploadThumbnail,

    previewAsset,
    handleUploadAsset,

    handleDelete,
    handleOnClose,
  };
};

export default useAddAssetModal;
