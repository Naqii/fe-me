import * as Yup from "yup";
import useMediaHandling from "../../useMediaHandling";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useDetailWork from "./useDetailWork";

const schemaUpdateThumbnail = Yup.object().shape({
  thumbnail: Yup.object({
    url: Yup.string().required(),
    publicId: Yup.string().required(),
    resourceType: Yup.mixed<"image" | "video" | "raw">()
      .oneOf(["image", "video", "raw"])

      .required(),
  })
    .nullable()
    .required("Please upload image"),
});

type FormValues = Yup.InferType<typeof schemaUpdateThumbnail>;

const useThumbnailTab = () => {
  const {
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,

    handleUploadFile,
    handleDeleteFile,
  } = useMediaHandling();

  const { dataWork } = useDetailWork();

  const form = useForm<FormValues>({
    resolver: yupResolver(schemaUpdateThumbnail),
  });

  const { setValue, getValues, watch } = form;

  // eslint-disable-next-line react-hooks/incompatible-library
  const preview = watch("thumbnail")?.url;

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
          resourceType: data.resourceType,
        },
        { shouldValidate: true },
      );
    });
  };

  const handleDeleteThumbnail = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    const thumbnail = getValues("thumbnail");

    if (!thumbnail?.publicId || !thumbnail?.resourceType) return;

    handleDeleteFile(
      {
        publicId: thumbnail.publicId,
        resourceType: thumbnail.resourceType,
      },
      () => onChange(undefined),
    );
  };

  return {
    dataWork,
    form,
    preview,

    handleDeleteThumbnail,
    handleUploadThumbnail,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,
  };
};

export default useThumbnailTab;
