import { ToasterContext } from "@/contexts/ToasterContext";
import { useContext } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { IWork } from "@/types/Work";
import workServices from "@/services/work.service";
import useMediaHandling from "../../useMediaHandling";
import { toDateStandard } from "@/utils/date";
import { DateValue } from "@heroui/react";

const schema = Yup.object().shape({
  title: Yup.string()
    .max(100, "Name cannot exceed 100 characters")
    .required("Please input name"),
  content: Yup.string().required("Please input link from youtube"),
  description: Yup.string().required("Please input description"),
  isShow: Yup.string().required("Please select status"),
  dateFinished: Yup.mixed<DateValue>().required(
    "Please select date finish job",
  ),
  thumbnail: Yup.object({
    url: Yup.string().required(),
    publicId: Yup.string().required(),
    resourceType: Yup.string().oneOf(["image", "video", "raw"]).required(),
  }).required("Please upload image"),
});

const useAddWorkModal = () => {
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
  const preview = watch("thumbnail")?.url;
  const fileUrl = getValues("thumbnail");

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
          resourceType: data.resourceType as "image" | "video" | "raw",
        },
        { shouldValidate: true },
      );
    });
  };

  const handleDeleteThumbnail = (
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

  const addWork = async (payload: IWork) => {
    const res = await workServices.addWork(payload);
    return res;
  };

  const {
    mutate: mutateAddWork,
    isPending: isPendingMutateAddWork,
    isSuccess: isSuccessMutateAddWork,
  } = useMutation({
    mutationFn: addWork,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error?.message || "An error occurred",
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Success add Work",
      });
      reset();
    },
  });

  const handleAddWork = (data: IWork) => {
    const payload = {
      ...data,
      dateFinished: toDateStandard(data.dateFinished as DateValue),
    };
    mutateAddWork(payload);
  };

  return {
    control,
    errors,
    reset,
    handleAddWork,
    handleSubmitForm,
    isPendingMutateAddWork,
    isSuccessMutateAddWork,

    preview,
    handleUploadThumbnail,
    isPendingMutateUploadFile,
    handleDeleteThumbnail,
    isPendingMutateDelete,
    handleOnClose,
  };
};

export default useAddWorkModal;
