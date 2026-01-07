import InputFile from "@/components/ui/InputFile";
import useAddAssetModal from "@/hooks/asset/admin/useAddAssetModal";
import { IType } from "@/types/Type";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  DatePicker,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Spinner,
} from "@heroui/react";
import { useEffect } from "react";
import { Controller } from "react-hook-form";

interface PropType {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchAsset: () => void;
}

const AddAssetModal = (props: PropType) => {
  const { isOpen, onClose, onOpenChange, refetchAsset } = props;

  const {
    dataType,
    control,
    errors,
    handleAddAsset,
    handleSubmitForm,
    isPendingMutateAddAsset,
    isSuccessMutateAddAsset,

    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,
    isPendingMutateUploadArchive,

    previewThumbnail,
    handleUploadThumbnail,

    previewAsset,
    handleUploadAsset,

    handleDelete,
    handleOnClose,
  } = useAddAssetModal();

  useEffect(() => {
    if (isSuccessMutateAddAsset) {
      onClose();
      refetchAsset();
    }
  }, [isSuccessMutateAddAsset, onClose, refetchAsset]);

  const disabledSubmit = isPendingMutateAddAsset;

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={() => handleOnClose(onClose)}
    >
      <form onSubmit={handleSubmitForm(handleAddAsset)}>
        <ModalContent className="m-4">
          <ModalHeader className="text-lg font-semibold">Add Asset</ModalHeader>
          <ModalBody>
            <section className="flex flex-col gap-4">
              <p className="text-foreground/70 text-sm font-bold">
                Information
              </p>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    autoFocus
                    label="Title"
                    variant="bordered"
                    type="text"
                    isInvalid={!!errors.title}
                    errorMessage={errors.title?.message}
                  />
                )}
              />
              <Controller
                name="type"
                control={control}
                render={({ field: { onChange, ...field } }) => (
                  <Autocomplete
                    {...field}
                    defaultItems={dataType?.data.data || []}
                    label="Type"
                    variant="bordered"
                    isInvalid={errors.type !== undefined}
                    errorMessage={errors.type?.message}
                    onSelectionChange={(value) => onChange(value)}
                    placeholder="Search Type Here"
                  >
                    {(type: IType) => (
                      <AutocompleteItem key={`${type._id}`}>
                        {type.name}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                )}
              />
              <Controller
                name="isShow"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Status"
                    variant="bordered"
                    isInvalid={!!errors.isShow}
                    errorMessage={errors.isShow?.message}
                    disallowEmptySelection
                    placeholder="Choose Status"
                  >
                    <SelectItem key="true">Show</SelectItem>
                    <SelectItem key="false">Hide</SelectItem>
                  </Select>
                )}
              />
              <Controller
                name="updated"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    label="Date Finished"
                    variant="bordered"
                    hideTimeZone
                    showMonthAndYearPickers
                    isInvalid={errors.updated !== undefined}
                    errorMessage={errors.updated?.message}
                  />
                )}
              />
              <p className="text-sm font-bold">Thumbnail</p>
              <Controller
                name="thumbnail"
                control={control}
                render={({ field: { onChange, ...field } }) => (
                  <InputFile
                    {...field}
                    onDelete={() => handleDelete(onChange)}
                    onUpload={(files) => handleUploadThumbnail(files, onChange)}
                    isUploading={isPendingMutateUploadFile}
                    isDeleting={isPendingMutateDeleteFile}
                    isInvalid={errors.thumbnail !== undefined}
                    errorMessage={errors.thumbnail?.message}
                    isDropable
                    preview={
                      typeof previewThumbnail === "string"
                        ? previewThumbnail
                        : ""
                    }
                  />
                )}
              />
              <Controller
                name="asset"
                control={control}
                render={({ field: { onChange, ...field } }) => (
                  <InputFile
                    {...field}
                    onDelete={() => handleDelete(onChange)}
                    onUpload={(files) => handleUploadAsset(files, onChange)}
                    isUploading={isPendingMutateUploadArchive}
                    isDeleting={isPendingMutateDeleteFile}
                    isInvalid={errors.asset !== undefined}
                    errorMessage={errors.asset?.message}
                    isDropable
                    preview={
                      typeof previewAsset === "string" ? previewAsset : ""
                    }
                  />
                )}
              />
            </section>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="flat"
              onPress={() => onClose()}
              disabled={disabledSubmit}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              className="bg-[#006d63]"
              type="submit"
              disabled={disabledSubmit}
            >
              {isPendingMutateAddAsset ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Create Asset"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddAssetModal;
