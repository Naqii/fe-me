import InputFile from "@/components/ui/InputFile";
import useAddImageModal from "@/hooks/image/useAddImageModal";
import {
  Button,
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
  refetchImages: () => void;
}

const AddImageModal = (props: PropType) => {
  const { isOpen, onClose, onOpenChange, refetchImages } = props;
  const {
    control,
    errors,
    handleSubmitForm,
    handleAddImage,
    isPendingMutateAddImage,
    isSuccessMutateAddImage,

    preview,
    handleUploadImage,
    isPendingMutateUploadFile,
    handleDeleteImage,
    isPendingMutateDeleteFile,
    handleOnClose,
  } = useAddImageModal();

  useEffect(() => {
    if (isSuccessMutateAddImage) {
      onClose();
      refetchImages();
    }
  }, [isSuccessMutateAddImage, onClose, refetchImages]);

  const disabledSubmit =
    isPendingMutateAddImage ||
    isPendingMutateUploadFile ||
    isPendingMutateDeleteFile;

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={() => handleOnClose(onClose)}
    >
      <form onSubmit={handleSubmitForm(handleAddImage)}>
        <ModalContent className="m-4">
          <ModalHeader>Add Image</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-bold">Information</p>
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
                    isInvalid={errors.title !== undefined}
                    errorMessage={errors.title?.message}
                    className="mb-2"
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
                    isInvalid={errors.isShow !== undefined}
                    errorMessage={errors.isShow?.message}
                    disallowEmptySelection
                    placeholder="Choose Status"
                  >
                    <SelectItem key="true">Show</SelectItem>
                    <SelectItem key="false">Hide</SelectItem>
                  </Select>
                )}
              />
              <p className="text-sm font-bold">Image</p>
              <Controller
                name="image"
                control={control}
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                render={({ field: { onChange, value, ...field } }) => (
                  <InputFile
                    {...field}
                    onDelete={() => handleDeleteImage(onChange)}
                    onUpload={(files) => handleUploadImage(files, onChange)}
                    isUploading={isPendingMutateUploadFile}
                    isDeleting={isPendingMutateDeleteFile}
                    isInvalid={errors.image !== undefined}
                    errorMessage={errors.image?.message}
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
              {isPendingMutateAddImage ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Create Image"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddImageModal;
