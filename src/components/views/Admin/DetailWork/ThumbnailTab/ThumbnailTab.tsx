import InputFile from "@/components/ui/InputFile";
import useThumbnailTab from "@/hooks/work/admin/useThumbnailTab";
import { IWork } from "@/types/Work";
import { Button, Card, CardBody, CardHeader, Spinner } from "@heroui/react";
import { useEffect } from "react";
import { Controller } from "react-hook-form";

interface PropType {
  currentThumbnail: string;
  onUpdate: (data: IWork) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const ThumbnailTab = (props: PropType) => {
  const { onUpdate, isPendingUpdate } = props;

  const {
    dataWork,
    form: {
      control,
      handleSubmit,
      setValue,
      formState: { errors },
    },
    preview,

    handleDeleteThumbnail,
    handleUploadThumbnail,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,
  } = useThumbnailTab();

  useEffect(() => {
    if (dataWork?.thumbnail) {
      setValue("thumbnail", {
        url: dataWork.thumbnail.url,
        publicId: dataWork.thumbnail.publicId,
        resourceType: dataWork.thumbnail.resourceType as
          | "image"
          | "video"
          | "raw",
      });
    }
  }, [dataWork, setValue]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Thumbnail Work</h1>
        <p className="text-small text-default-400 w-full">
          Manage thumbnail of this Work
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
                isDeleting={isPendingMutateDeleteFile}
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
