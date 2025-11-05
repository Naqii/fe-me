import useAddVideoModal from "@/hooks/video/useAddVideoModal";
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
  Textarea,
} from "@heroui/react";
import { useEffect } from "react";
import { Controller } from "react-hook-form";

interface AddVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchVideos: () => void;
}

const AddVideoModal = ({
  isOpen,
  onClose,
  onOpenChange,
  refetchVideos,
}: AddVideoModalProps) => {
  const {
    control,
    errors,
    handleAddVideo,
    handleSubmitForm,
    isPendingMutateAddVideo,
    isSuccessMutateAddVideo,
  } = useAddVideoModal();

  useEffect(() => {
    if (isSuccessMutateAddVideo) {
      onClose();
      refetchVideos();
    }
  }, [isSuccessMutateAddVideo, onClose, refetchVideos]);

  const disabledSubmit = isPendingMutateAddVideo;

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={() => onClose()}
    >
      <form onSubmit={handleSubmitForm(handleAddVideo)}>
        <ModalContent className="m-4">
          <ModalHeader className="text-lg font-semibold">Add Video</ModalHeader>
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

              <p className="text-foreground/70 text-sm font-bold">Video</p>
              <Controller
                name="video"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    label="Video Link"
                    variant="bordered"
                    type="text"
                    isInvalid={!!errors.title}
                    errorMessage={errors.title?.message}
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
              {isPendingMutateAddVideo ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Create Video"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddVideoModal;
