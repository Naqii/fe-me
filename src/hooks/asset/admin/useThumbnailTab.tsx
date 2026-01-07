import * as Yup from "yup";
import useMediaHandling from "../../useMediaHandling";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useDetailWork from "./useDetailAsset";

const schemaUpdateThumbnail = Yup.object().shape({
  thumbnail: Yup.mixed<FileList | string>().required("Please input Thumbnail"),
});

const useThumbnailTab = () => {
  const {
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,

    handleUploadFile,
    handleDeleteFile,
  } = useMediaHandling();

  const { dataWork } = useDetailWork();

  const {
    control: controlUpdateThumbnail,
    handleSubmit: handleSubmitUpdateThumbnail,
    formState: { errors: errorsUpdateThumbnail },
    reset: resetUpdateThumbnail,
    watch: watchUpdateThumbnail,
    getValues: getValuesUpdateThumbnail,
    setValue: setValueUpdateThumbnail,
  } = useForm({
    resolver: yupResolver(schemaUpdateThumbnail),
    defaultValues: {
      thumbnail: "",
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const preview = watchUpdateThumbnail("thumbnail");
  const fileUrl = getValuesUpdateThumbnail("thumbnail");

  const handleUploadThumbnail = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    const oldThumbnail = dataWork?.thumbnail;
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        setValueUpdateThumbnail("thumbnail", fileUrl);
        if (oldThumbnail) {
          handleDeleteFile(oldThumbnail, () => {});
        }
      }
    });
  };

  const handleDeleteThumbnail = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleDeleteFile(fileUrl, () => onChange(undefined));
  };

  return {
    handleDeleteThumbnail,
    handleUploadThumbnail,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,

    controlUpdateThumbnail,
    handleSubmitUpdateThumbnail,
    errorsUpdateThumbnail,
    resetUpdateThumbnail,

    preview,
  };
};

export default useThumbnailTab;
