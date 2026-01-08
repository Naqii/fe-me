import { useEffect } from "react";
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
import useDetailImage from "@/hooks/image/admin/useDetailImage";

const DetailImage = () => {
  const {
    dataImage,
    form: {
      control,
      handleSubmit,
      setValue,
      formState: { errors },
    },
    mutate,
    isPending,
    preview,
    handleUploadImage,
    handleDeleteImage,
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,
  } = useDetailImage();

  useEffect(() => {
    setValue("title", `${dataImage?.title}`);
    setValue("isShow", `${dataImage?.isShow}`);
    if (dataImage?.image) {
      setValue("image", {
        url: dataImage.image.url,
        publicId: dataImage.image.publicId,
        resourceType: dataImage.image.resourceType as "image" | "video" | "raw",
      });
    }
  }, [dataImage, setValue]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-start">
        <h1 className="text-xl font-bold">Image Information</h1>
        <p className="text-default-400 text-sm">Manage image details</p>
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
                    field.onChange(String(Array.from(keys)[0]))
                  }
                  isInvalid={!!errors.isShow}
                  errorMessage={errors.isShow?.message}
                >
                  <SelectItem key="true">Show</SelectItem>
                  <SelectItem key="false">Hide</SelectItem>
                </Select>
              )}
            />
          </Skeleton>

          {/* UPLOAD NEW IMAGE */}
          <Controller
            name="image"
            control={control}
            render={({ field: { onChange, ...field } }) => (
              <InputFile
                {...field}
                label={
                  <p className="text-default-700 mb-2 text-sm font-medium">
                    Current Image and Upload New Image here
                  </p>
                }
                preview={preview}
                onUpload={(files) => handleUploadImage(files, onChange)}
                onDelete={() => handleDeleteImage(onChange)}
                isUploading={isPendingMutateUploadFile}
                isDeleting={isPendingMutateDeleteFile}
                isInvalid={!!errors.image}
                errorMessage={errors.image?.message}
              />
            )}
          />

          <Button
            color="danger"
            className="mt-2 bg-[#006d63]"
            type="submit"
            disabled={isPending}
          >
            {isPending ? <Spinner size="sm" color="white" /> : "Save Changes"}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default DetailImage;
