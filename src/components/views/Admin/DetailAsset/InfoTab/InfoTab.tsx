import useInfoTab from "@/hooks/asset/admin/useInfoTab";
import { IAssetForm } from "@/types/Asset";
import { ICategory } from "@/types/Category";
import { toInputDate } from "@/utils/date";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  DatePicker,
  Input,
  Select,
  SelectItem,
  Skeleton,
  Spinner,
} from "@heroui/react";
import { useEffect } from "react";
import { Controller } from "react-hook-form";

interface PropType {
  dataAsset?: IAssetForm;
  onUpdate: (data: IAssetForm) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const InfoTab = (props: PropType) => {
  const { dataAsset, onUpdate, isPendingUpdate, isSuccessUpdate } = props;
  const {
    dataCategory,

    controlUpdateInfo,
    handleSubmitUpdateInfo,
    errorsUpdateInfo,
    resetUpdateInfo,
    setValueUpdateInfo,

    setSelectedCategory,
  } = useInfoTab();

  useEffect(() => {
    setValueUpdateInfo("title", `${dataAsset?.title}`);
    setValueUpdateInfo("category", `${dataAsset?.category}`);
    setValueUpdateInfo("isShow", `${dataAsset?.isShow}`);
    if (dataAsset?.updated) {
      setValueUpdateInfo("updated", toInputDate(`${dataAsset.updated}`));
    }
  }, [dataAsset, setValueUpdateInfo]);

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateInfo();
    }
  }, [isSuccessUpdate]);

  useEffect(() => {
    if (dataAsset?.category) {
      setSelectedCategory(dataAsset.category);
    }
  }, [dataAsset, setSelectedCategory]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Asset Information</h1>
        <p className="text-small text-default-400 w-full">
          Manage information of this Asset
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateInfo(onUpdate)}
        >
          <Skeleton isLoaded={!!dataAsset?.title} className="rounded-lg">
            <Controller
              name="title"
              control={controlUpdateInfo}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Title"
                  variant="bordered"
                  labelPlacement="outside"
                  type="text"
                  isInvalid={errorsUpdateInfo.title !== undefined}
                  errorMessage={errorsUpdateInfo.title?.message}
                  className="mt-2"
                />
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataAsset?.category} className="rounded-lg">
            <Controller
              name="category"
              control={controlUpdateInfo}
              render={({ field: { onChange, ...field } }) => (
                <Autocomplete
                  {...field}
                  defaultItems={dataCategory?.data.data || []}
                  label="Category Asset"
                  labelPlacement="outside"
                  variant="bordered"
                  selectedKey={dataAsset?.category}
                  isInvalid={errorsUpdateInfo.category !== undefined}
                  errorMessage={errorsUpdateInfo.category?.message}
                  onSelectionChange={(value) => {
                    onChange(value);
                    setSelectedCategory(value as string);
                  }}
                  placeholder="Search Category Here"
                >
                  {(category: ICategory) => (
                    <AutocompleteItem key={`${category._id}`}>
                      {category.name}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataAsset} className="rounded-lg">
            <Controller
              name="isShow"
              control={controlUpdateInfo}
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
                  isInvalid={!!errorsUpdateInfo.isShow}
                  errorMessage={errorsUpdateInfo.isShow?.message}
                >
                  <SelectItem key="true">Show</SelectItem>
                  <SelectItem key="false">Hide</SelectItem>
                </Select>
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataAsset?.updated} className="rounded-lg">
            <Controller
              name="updated"
              control={controlUpdateInfo}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="Updated"
                  variant="bordered"
                  labelPlacement="outside"
                  hideTimeZone
                  showMonthAndYearPickers
                  isInvalid={errorsUpdateInfo.updated !== undefined}
                  errorMessage={errorsUpdateInfo.updated?.message}
                />
              )}
            />
          </Skeleton>
          <Button
            color="primary"
            className="bg-[#006d63]"
            type="submit"
            disabled={isPendingUpdate || !dataAsset?._id}
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

export default InfoTab;
