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
import useDeleteAssetModal from "@/hooks/asset/admin/useDeleteAssetModal";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchAsset: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeleteAssetModal = (props: PropTypes) => {
  const {
    isOpen,
    onOpenChange,
    onClose,
    refetchAsset,
    selectedId,
    setSelectedId,
  } = props;

  const {
    mutateDeleteAsset,
    isPendingMutateDeleteAsset,
    isSuccessMutateDeleteAsset,
  } = useDeleteAssetModal();

  useEffect(() => {
    if (isSuccessMutateDeleteAsset) {
      onClose();
      refetchAsset();
      setSelectedId("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessMutateDeleteAsset, onClose, refetchAsset]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete Asset</ModalHeader>
        <ModalBody>
          <p className="text-medium">
            Are you sure want to delete this Asset ?
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
            disabled={isPendingMutateDeleteAsset}
          >
            Cancel
          </Button>
          <Button
            color="danger"
            type="submit"
            disabled={isPendingMutateDeleteAsset}
            onPress={() => mutateDeleteAsset(selectedId)}
          >
            {isPendingMutateDeleteAsset ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete Asset"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteAssetModal;
