import * as Yup from "yup";
import useMediaHandling from "../../useMediaHandling";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useDetailAsset from "./useDetailAsset";

const schemaUpdateAsset = Yup.object().shape({
  asset: Yup.object({
    url: Yup.string().required(),
    publicId: Yup.string().required(),
    resourceType: Yup.mixed<"image" | "video" | "raw">()
      .oneOf(["image", "video", "raw"])
      .required(),
  })
    .nullable()
    .required("Please upload image"),
});

type FormValues = Yup.InferType<typeof schemaUpdateAsset>;

const useAssetTab = () => {
  const {
    isPendingMutateUploadAsset,
    isPendingMutateDelete,

    handleUploadArchive,
    handleDeleteFile,
  } = useMediaHandling();

  const { dataAsset } = useDetailAsset();

  const form = useForm<FormValues>({
    resolver: yupResolver(schemaUpdateAsset),
  });

  const { setValue, getValues, watch } = form;

  // eslint-disable-next-line react-hooks/incompatible-library
  const preview = watch("asset")?.url;

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
          resourceType: data.resourceType,
        },
        { shouldValidate: true },
      );
    });
  };

  const handleDeleteAsset = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    const asset = getValues("asset");

    if (!asset?.publicId || !asset?.resourceType) return;

    handleDeleteFile(
      {
        publicId: asset.publicId,
        resourceType: asset.resourceType,
      },
      () => onChange(undefined),
    );
  };

  return {
    dataAsset,
    form,
    preview,

    handleDeleteAsset,
    handleUploadAsset,
    isPendingMutateDelete,
    isPendingMutateUploadAsset,
  };
};

export default useAssetTab;
