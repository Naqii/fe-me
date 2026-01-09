import InputFile from "@/components/ui/InputFile";
import useAssetTab from "@/hooks/asset/admin/useAssetTab";
import { IAsset } from "@/types/Asset";
import { Button, Card, CardBody, CardHeader, Spinner } from "@heroui/react";
import { useEffect } from "react";
import { Controller } from "react-hook-form";

interface PropType {
  currentAsset: string;
  onUpdate: (data: IAsset) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const AssetTab = (props: PropType) => {
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

    handleDeleteAsset,
    handleUploadAsset,
    isPendingMutateDelete,
    isPendingMutateUploadAsset,
  } = useAssetTab();

  useEffect(() => {
    if (dataAsset?.asset) {
      setValue("asset", {
        url: dataAsset.asset.url,
        publicId: dataAsset.asset.publicId,
        resourceType: dataAsset.asset.resourceType as "image" | "video" | "raw",
      });
    }
  }, [dataAsset, setValue]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Archive Asset</h1>
        <p className="text-small text-default-400 w-full">
          Manage Archive of this Asset
        </p>
      </CardHeader>
      <CardBody>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onUpdate)}>
          <Controller
            name="asset"
            control={control}
            render={({ field: { onChange, ...field } }) => (
              <InputFile
                {...field}
                onDelete={() => handleDeleteAsset(onChange)}
                onUpload={(files) => handleUploadAsset(files, onChange)}
                isUploading={isPendingMutateUploadAsset}
                isDeleting={isPendingMutateDelete}
                isInvalid={errors.asset !== undefined}
                errorMessage={errors.asset?.message}
                isDropable
                label={
                  <p className="text-default-700 mb-2 text-sm font-medium">
                    Curent Asset and Upload New Asset here
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
            disabled={isPendingMutateUploadAsset || isPendingUpdate || !preview}
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

export default AssetTab;
