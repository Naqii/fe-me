import InputFile from "@/components/ui/InputFile";
import useAddCategoryModal from "@/hooks/category/useAddCategoryModal";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Textarea,
} from "@heroui/react";
import { useEffect } from "react";
import { Controller } from "react-hook-form";

interface PropType {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchCategorys: () => void;
}

const AddCategoryModal = (props: PropType) => {
  const { isOpen, onClose, onOpenChange, refetchCategorys } = props;
  const {
    control,
    errors,
    handleSubmitForm,
    handleAddCategory,
    isPendingMutateAddCategory,
    isSuccessMutateAddCategory,

    preview,
    handleUploadIcon,
    isPendingMutateUploadFile,
    handleDeleteIcon,
    isPendingMutateDelete,
    handleOnClose,
  } = useAddCategoryModal();

  useEffect(() => {
    if (isSuccessMutateAddCategory) {
      onClose();
      refetchCategorys();
    }
  }, [isSuccessMutateAddCategory, onClose, refetchCategorys]);

  const disabledSubmit =
    isPendingMutateAddCategory ||
    isPendingMutateUploadFile ||
    isPendingMutateDelete;

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={() => handleOnClose(onClose)}
    >
      <form onSubmit={handleSubmitForm(handleAddCategory)}>
        <ModalContent className="m-4">
          <ModalHeader>Add Image</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-bold">Information</p>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    autoFocus
                    label="Name"
                    variant="bordered"
                    type="text"
                    isInvalid={errors.name !== undefined}
                    errorMessage={errors.name?.message}
                    className="mb-2"
                  />
                )}
              />
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
              <p className="text-sm font-bold">Icon</p>
              <Controller
                name="icon"
                control={control}
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                render={({ field: { onChange, value, ...field } }) => (
                  <InputFile
                    {...field}
                    onDelete={() => handleDeleteIcon(onChange)}
                    onUpload={(files) => handleUploadIcon(files, onChange)}
                    isUploading={isPendingMutateUploadFile}
                    isDeleting={isPendingMutateDelete}
                    isInvalid={errors.icon !== undefined}
                    errorMessage={errors.icon?.message}
                    isDropable
                    preview={typeof preview === "string" ? preview : ""}
                  />
                )}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="flat"
              onPress={() => handleOnClose(onClose)}
              disabled={disabledSubmit}
            >
              Cancel
            </Button>
            <Button
              color="danger"
              className="bg-[#006d63]"
              type="submit"
              disabled={disabledSubmit}
            >
              {isPendingMutateAddCategory ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Create Category"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddCategoryModal;
