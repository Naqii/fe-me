import { useEffect } from "react";
import { Controller } from "react-hook-form";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Skeleton,
  Spinner,
  Textarea,
} from "@heroui/react";
import InputFile from "@/components/ui/InputFile";
import useDetailCategory from "@/hooks/category/useDetailCategory";

const DetailCategory = () => {
  const {
    dataCategory,
    form: {
      control,
      handleSubmit,
      setValue,
      formState: { errors },
    },
    mutate,
    isPending,
    preview,
    handleUploadIcon,
    handleDeleteIcon,
    isPendingMutateUploadFile,
    isPendingMutateDelete,
  } = useDetailCategory();

  useEffect(() => {
    setValue("name", `${dataCategory?.name}`);
    setValue("description", `${dataCategory?.description}`);
    if (dataCategory?.icon) {
      setValue("icon", {
        url: dataCategory.icon.url,
        publicId: dataCategory.icon.publicId,
        resourceType: dataCategory.icon.resourceType as
          | "image"
          | "video"
          | "raw",
      });
    }
  }, [dataCategory, setValue]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-start">
        <h1 className="text-xl font-bold">Category Information</h1>
        <p className="text-default-400 text-sm">Manage Category details</p>
      </CardHeader>

      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit((data) => mutate(data))}
        >
          <Skeleton isLoaded={!!dataCategory?.name} className="rounded-lg">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Name"
                  variant="bordered"
                  labelPlacement="outside"
                  isInvalid={!!errors.name}
                  errorMessage={errors.name?.message}
                />
              )}
            />
          </Skeleton>
          <Skeleton
            isLoaded={!!dataCategory?.description}
            className="rounded-lg"
          >
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  label="Description"
                  variant="bordered"
                  type="text"
                  isInvalid={errors.description !== undefined}
                  errorMessage={errors.description?.message}
                  className="mb-2"
                />
              )}
            />
          </Skeleton>
          <Controller
            name="icon"
            control={control}
            render={({ field: { onChange, ...field } }) => (
              <InputFile
                {...field}
                label={
                  <p className="text-default-700 mb-2 text-sm font-medium">
                    Current Icon and Upload New Icon here
                  </p>
                }
                preview={preview}
                onUpload={(files) => handleUploadIcon(files, onChange)}
                onDelete={() => handleDeleteIcon(onChange)}
                isUploading={isPendingMutateUploadFile}
                isDeleting={isPendingMutateDelete}
                isInvalid={!!errors.icon}
                errorMessage={errors.icon?.message}
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

export default DetailCategory;
