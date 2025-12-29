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
import useDeleteWorkModal from "@/hooks/work/admin/useDeleteWorkModal";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchWork: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeleteWorkModal = (props: PropTypes) => {
  const {
    isOpen,
    onOpenChange,
    onClose,
    refetchWork,
    selectedId,
    setSelectedId,
  } = props;

  const {
    mutateDeleteWork,
    isPendingMutateDeleteWork,
    isSuccessMutateDeleteWork,
  } = useDeleteWorkModal();

  useEffect(() => {
    if (isSuccessMutateDeleteWork) {
      onClose();
      refetchWork();
      setSelectedId("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessMutateDeleteWork, onClose, refetchWork]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete Work</ModalHeader>
        <ModalBody>
          <p className="text-medium">Are you sure want to delete this Work ?</p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            variant="flat"
            onPress={() => {
              onClose();
              setSelectedId("");
            }}
            disabled={isPendingMutateDeleteWork}
          >
            Cancel
          </Button>
          <Button
            color="danger"
            type="submit"
            disabled={isPendingMutateDeleteWork}
            onPress={() => mutateDeleteWork(selectedId)}
          >
            {isPendingMutateDeleteWork ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete Work"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteWorkModal;
