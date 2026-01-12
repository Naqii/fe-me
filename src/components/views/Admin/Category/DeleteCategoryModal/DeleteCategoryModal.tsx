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
import useDeleteCategoryModal from "@/hooks/category/useDeleteCategoryModal";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchCategory: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeleteCategoryModal = (props: PropTypes) => {
  const {
    isOpen,
    onOpenChange,
    onClose,
    refetchCategory,
    selectedId,
    setSelectedId,
  } = props;

  const {
    mutateDeleteCategory,
    isPendingMutateDeleteCategory,
    isSuccessMutateDeleteCategory,
  } = useDeleteCategoryModal();

  useEffect(() => {
    if (isSuccessMutateDeleteCategory) {
      onClose();
      refetchCategory();
      setSelectedId("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessMutateDeleteCategory, onClose, refetchCategory]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete Category</ModalHeader>
        <ModalBody>
          <p className="text-medium">
            Are you sure want to delete this Category ?
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
            disabled={isPendingMutateDeleteCategory}
          >
            Cancel
          </Button>
          <Button
            color="danger"
            type="submit"
            disabled={isPendingMutateDeleteCategory}
            onPress={() => mutateDeleteCategory(selectedId)}
          >
            {isPendingMutateDeleteCategory ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete Category"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteCategoryModal;
