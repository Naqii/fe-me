import DropDownAction from "@/components/commons/DropDownAction";
import DataTable from "@/components/ui/DataTable";
import useChangeUrl from "@/hooks/useChangeUrl";
import { Chip, useDisclosure } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LISTS_VIDEO } from "./Video.constant";
import useVideo from "@/hooks/video/useVideo";

const Video = () => {
  const { push, isReady, query } = useRouter();
  const {
    dataVideo,
    isLoadingVideo,
    isRefetchingVideo,
    refetchVideos,

    setSelectedId,
  } = useVideo();

  const addVideoModal = useDisclosure();
  const deleteVideoModal = useDisclosure();
  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setUrl();
      refetchVideos();
      setSelectedId("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);

  const renderCell = useCallback(
    (video: Record<string, unknown>, columnKey: Key) => {
      const cellValue = video[columnKey as keyof typeof video];

      switch (columnKey) {
        case "thumbnail":
          return (
            <Image
              src={`${cellValue}`}
              alt="image"
              width={300}
              height={200}
              className="rounded-lg"
            />
          );
        case "isShow":
          return (
            <Chip
              color={cellValue ? "success" : "warning"}
              size="sm"
              variant="flat"
            >
              {cellValue === true ? "Published" : "Not Published"}
            </Chip>
          );
        case "actions":
          return (
            <DropDownAction
              onPressButtonDetail={() => push(`/admin/video/${video._id}`)}
              onPressButtonDelete={() => {
                setSelectedId(`${video._id}`);
                deleteVideoModal.onOpen();
              }}
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [push, setSelectedId, deleteVideoModal],
  );

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          columns={COLUMN_LISTS_VIDEO}
          emptyContent="Video is empty"
          isLoading={isLoadingVideo || isRefetchingVideo}
          data={dataVideo?.data || []}
          onClickButtonTopContent={addVideoModal.onOpen}
          buttonTopContentLabel="Create Video"
          renderCell={renderCell}
          totalPages={dataVideo?.pagination.totalPages}
        />
      )}
      {/* <AddImageModal {...addImageModal} refetchImages={refetchImages} />
      <DeleteImageModal
        {...deleteImageModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchImages={refetchImages}
      /> */}
    </section>
  );
};

export default Video;
