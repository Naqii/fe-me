import InputFile from "@/components/ui/InputFile";
import useAddWorkModal from "@/hooks/work/admin/useAddWorkModal";
import {
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
  Textarea,
} from "@heroui/react";
import { useEffect } from "react";
import { Controller } from "react-hook-form";

interface PropType {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchWork: () => void;
}

const AddWorkModal = (props: PropType) => {
  const { isOpen, onClose, onOpenChange, refetchWork } = props;

  const {
    control,
    errors,
    handleSubmitForm,
    handleAddWork,
    isPendingMutateAddWork,
    isSuccessMutateAddWork,

    preview,
    handleUploadThumbnail,
    isPendingMutateUploadFile,
    handleDeleteThumbnail,
    isPendingMutateDelete,
    handleOnClose,
  } = useAddWorkModal();

  useEffect(() => {
    if (isSuccessMutateAddWork) {
      onClose();
      refetchWork();
    }
  }, [isSuccessMutateAddWork, onClose, refetchWork]);

  const disabledSubmit = isPendingMutateAddWork;

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={() => handleOnClose(onClose)}
    >
      <form onSubmit={handleSubmitForm(handleAddWork)}>
        <ModalContent className="m-4">
          <ModalHeader className="text-lg font-semibold">Add Work</ModalHeader>
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
                name="content"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Content"
                    variant="bordered"
                    type="text"
                    isInvalid={!!errors.content}
                    errorMessage={errors.content?.message}
                  />
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
                name="description"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    label="Descritpion"
                    variant="bordered"
                    type="text"
                    isInvalid={!!errors.description}
                    errorMessage={errors.description?.message}
                  />
                )}
              />
              <Controller
                name="dateFinished"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    label="Date Finished"
                    variant="bordered"
                    hideTimeZone
                    showMonthAndYearPickers
                    isInvalid={errors.dateFinished !== undefined}
                    errorMessage={errors.dateFinished?.message}
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
                    onDelete={() => handleDeleteThumbnail(onChange)}
                    onUpload={(files) => handleUploadThumbnail(files, onChange)}
                    isUploading={isPendingMutateUploadFile}
                    isDeleting={isPendingMutateDelete}
                    isInvalid={errors.thumbnail !== undefined}
                    errorMessage={errors.thumbnail?.message}
                    isDropable
                    preview={typeof preview === "string" ? preview : ""}
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
              {isPendingMutateAddWork ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Create Work"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddWorkModal;
