import { useEffect } from "react";
import Image from "next/image";
import { Controller } from "react-hook-form";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
  Skeleton,
  Spinner,
} from "@heroui/react";
import InputFile from "@/components/ui/InputFile";
import useDetailImage from "@/hooks/image/useDetailImage";

const DetailImage = () => {
  const {
    dataImage,
    form: {
      control,
      handleSubmit,
      setValue,
      reset,
      formState: { errors },
    },
    mutate,
    isPending,
    isSuccess,
    preview,
    handleUploadImage,
    handleDeleteImage,
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,
  } = useDetailImage();

  useEffect(() => {
    if (dataImage) {
      setValue("title", `${dataImage?.title}`);
      setValue("isShow", `${dataImage?.isShow}`);
      setValue("image", `${dataImage?.image}`);
    }
  }, [dataImage, setValue]);

  useEffect(() => {
    if (isSuccess) reset();
  }, [isSuccess, reset]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-start">
        <h1 className="text-xl font-bold">Image Information</h1>
        <p className="text-default-400 text-sm">Manage this images details</p>
      </CardHeader>

      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit((data) => mutate(data))}
        >
          <Skeleton isLoaded={!!dataImage}>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Title"
                  variant="bordered"
                  labelPlacement="outside"
                  isInvalid={!!errors.title}
                  errorMessage={errors.title?.message}
                />
              )}
            />
          </Skeleton>

          <Skeleton isLoaded={!!dataImage}>
            <Controller
              name="isShow"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Status"
                  variant="bordered"
                  labelPlacement="outside"
                  selectedKeys={[field.value]}
                  onSelectionChange={(keys) =>
                    field.onChange(Array.from(keys)[0]?.toString() ?? "false")
                  }
                  isInvalid={!!errors.isShow}
                  errorMessage={errors.isShow?.message}
                  placeholder="Choose Status"
                >
                  <SelectItem key="true">Show</SelectItem>
                  <SelectItem key="false">Hide</SelectItem>
                </Select>
              )}
            />
          </Skeleton>

          <div className="flex flex-col gap-2">
            <p className="text-default-700 text-sm font-medium">
              Current Image
            </p>
            <Skeleton isLoaded={!!dataImage?.image} className="rounded-lg">
              <div className="relative h-48 w-full max-w-sm overflow-hidden rounded-lg border">
                {dataImage?.image && typeof dataImage.image === "string" && (
                  <Image
                    src={dataImage.image}
                    alt="image"
                    fill
                    className="rounded-lg object-contain"
                  />
                )}
              </div>
            </Skeleton>
          </div>

          <Controller
            name="image"
            control={control}
            render={({ field: { onChange, ...field } }) => (
              <InputFile
                {...field}
                onDelete={() => handleDeleteImage(onChange)}
                onUpload={(files) => handleUploadImage(files, onChange)}
                isUploading={isPendingMutateUploadFile}
                isDeleting={isPendingMutateDeleteFile}
                isInvalid={!!errors.image}
                errorMessage={errors.image?.message}
                isDropable
                label={
                  <p className="text-default-700 mb-2 text-sm font-medium">
                    Upload New Image
                  </p>
                }
                preview={typeof preview === "string" ? preview : ""}
              />
            )}
          />

          <Button
            color="danger"
            className="mt-2 bg-[#006d63]"
            type="submit"
            disabled={isPending || !dataImage?._id}
          >
            {isPending ? <Spinner size="sm" color="white" /> : "Save Changes"}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default DetailImage;
