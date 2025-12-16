import InputFile from "@/components/ui/InputFile";
import useThumbnailTab from "@/hooks/work/useThumbnailTab";
import { IWork } from "@/types/Work";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Skeleton,
  Spinner,
} from "@heroui/react";
import Image from "next/image";
import { useEffect } from "react";
import { Controller } from "react-hook-form";

interface PropType {
  currentThumbnail: string;
  onUpdate: (data: IWork) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const ThumbnailTab = (props: PropType) => {
  const { currentThumbnail, onUpdate, isPendingUpdate, isSuccessUpdate } =
    props;

  const {
    handleDeleteThumbnail,
    handleUploadThumbnail,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,

    controlUpdateThumbnail,
    handleSubmitUpdateThumbnail,
    errorsUpdateThumbnail,
    resetUpdateThumbnail,

    preview,
  } = useThumbnailTab();

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateThumbnail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessUpdate]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Thumbnail Work</h1>
        <p className="text-small text-default-400 w-full">
          Manage thumbnail of this Work
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateThumbnail(onUpdate)}
        >
          <div className="flex flex-col gap-2">
            <p className="text-default-700 text-sm font-medium">
              Current Thumbnail
            </p>
            <Skeleton
              isLoaded={!!currentThumbnail}
              className="aspect-video rounded-lg"
            >
              <Image
                src={currentThumbnail}
                alt="thumbnail"
                fill
                className="relative!"
              />
            </Skeleton>
          </div>
          <Controller
            name="thumbnail"
            control={controlUpdateThumbnail}
            render={({ field: { onChange, ...field } }) => (
              <InputFile
                {...field}
                onDelete={() => handleDeleteThumbnail(onChange)}
                onUpload={(files) => handleUploadThumbnail(files, onChange)}
                isUploading={isPendingMutateUploadFile}
                isDeleting={isPendingMutateDeleteFile}
                isInvalid={errorsUpdateThumbnail.thumbnail !== undefined}
                errorMessage={errorsUpdateThumbnail.thumbnail?.message}
                isDropable
                label={
                  <p className="text-default-700 mb-2 text-sm font-medium">
                    Upload New Thumbnail
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
