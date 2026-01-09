import InputFile from "@/components/ui/InputFile";
import useThumbnailTab from "@/hooks/asset/admin/useThumbnailTab";
import { IAsset } from "@/types/Asset";
import { Button, Card, CardBody, CardHeader, Spinner } from "@heroui/react";
import { useEffect } from "react";
import { Controller } from "react-hook-form";

interface PropType {
  currentThumbnail: string;
  onUpdate: (data: IAsset) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const ThumbnailTab = (props: PropType) => {
  const { onUpdate, isPendingUpdate } = props;

  const {
    dataAsset,
    form: {
      control,
      handleSubmit,
      setValue,
      formState: { errors },
    },
    preview,

    handleDeleteThumbnail,
    handleUploadThumbnail,
    isPendingMutateDelete,
    isPendingMutateUploadFile,
  } = useThumbnailTab();

  useEffect(() => {
    if (dataAsset?.thumbnail) {
      setValue("thumbnail", {
        url: dataAsset.thumbnail.url,
        publicId: dataAsset.thumbnail.publicId,
        resourceType: dataAsset.thumbnail.resourceType as
          | "image"
          | "video"
          | "raw",
      });
    }
  }, [dataAsset, setValue]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Thumbnail Asset</h1>
        <p className="text-small text-default-400 w-full">
          Manage thumbnail of this Asset
        </p>
      </CardHeader>
      <CardBody>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onUpdate)}>
          <Controller
            name="thumbnail"
            control={control}
            render={({ field: { onChange, ...field } }) => (
              <InputFile
                {...field}
                onDelete={() => handleDeleteThumbnail(onChange)}
                onUpload={(files) => handleUploadThumbnail(files, onChange)}
                isUploading={isPendingMutateUploadFile}
                isDeleting={isPendingMutateDelete}
                isInvalid={errors.thumbnail !== undefined}
                errorMessage={errors.thumbnail?.message}
                isDropable
                label={
                  <p className="text-default-700 mb-2 text-sm font-medium">
                    Curent Thumbnail and Upload New Thumbnail here
                  </p>
                }
                preview={typeof preview === "string" ? preview : ""}
              />
            )}
          />
          <Button
            color="primary"
            className="bg-[#006d63]"
            type="submit"
            disabled={isPendingMutateUploadFile || isPendingUpdate || !preview}
          >
            {isPendingUpdate ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default ThumbnailTab;
