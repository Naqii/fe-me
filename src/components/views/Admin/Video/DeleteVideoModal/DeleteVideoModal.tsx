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
import useDeleteVideoModal from "@/hooks/video/useDeleteVideoModal";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchVideo: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeleteVideoModal = (props: PropTypes) => {
  const {
    isOpen,
    onOpenChange,
    onClose,
    refetchVideo,
    selectedId,
    setSelectedId,
  } = props;

  const {
    mutateDeleteVideo,
    isPendingMutateDeleteVideo,
    isSuccessMutateDeleteVideo,
  } = useDeleteVideoModal();

  useEffect(() => {
    if (isSuccessMutateDeleteVideo) {
      onClose();
      refetchVideo();
      setSelectedId("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessMutateDeleteVideo, onClose, refetchVideo]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete Video</ModalHeader>
        <ModalBody>
          <p className="text-medium">
            Are you sure want to delete this Video ?
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
            disabled={isPendingMutateDeleteVideo}
          >
            Cancel
          </Button>
          <Button
            color="danger"
            type="submit"
            disabled={isPendingMutateDeleteVideo}
            onPress={() => mutateDeleteVideo(selectedId)}
          >
            {isPendingMutateDeleteVideo ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete Video"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteVideoModal;
