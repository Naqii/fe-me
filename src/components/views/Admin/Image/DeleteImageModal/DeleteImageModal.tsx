import { Dispatch, SetStateAction, useEffect } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@heroui/react";
import useDeleteImageModal from "../../../../../hooks/image/useDeleteImageModal";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchImage: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeleteImageModal = (props: PropTypes) => {
  const {
    isOpen,
    onOpenChange,
    onClose,
    refetchImage,
    selectedId,
    setSelectedId,
  } = props;

  const {
    mutateDeleteImage,
    isPendingMutateDeleteImage,
    isSuccessMutateDeleteImage,
  } = useDeleteImageModal();

  useEffect(() => {
    if (isSuccessMutateDeleteImage) {
      onClose();
      refetchImage();
      setSelectedId("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessMutateDeleteImage, onClose, refetchImage]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete Image</ModalHeader>
        <ModalBody>
          <p className="text-medium">
            Are you sure want to delete this Image ?
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            variant="flat"
            onPress={() => {
              onClose();
              setSelectedId("");
            }}
            disabled={isPendingMutateDeleteImage}
          >
            Cancel
          </Button>
          <Button
            color="danger"
            type="submit"
            disabled={isPendingMutateDeleteImage}
            onPress={() => mutateDeleteImage(selectedId)}
          >
            {isPendingMutateDeleteImage ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete Image"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteImageModal;
