import DropDownAction from "@/components/commons/DropDownAction";
import DataTable from "@/components/ui/DataTable";
import useImage from "@/hooks/image/useImage";
import useChangeUrl from "@/hooks/useChangeUrl";
import { Chip, useDisclosure } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LISTS_IMAGE } from "./Image.constant";
import AddImageModal from "./AddImageModal";

const Img = () => {
  const { push, isReady, query } = useRouter();
  const {
    dataImage,
    isLoadingImage,
    isRefetchingImage,
    refetchImages,

    selectedId,
    setSelectedId,
  } = useImage();

  const addImageModal = useDisclosure();
  const deleteImageModal = useDisclosure();
  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setUrl();
      refetchImages();
      setSelectedId("");
    }
  }, [isReady]);

  const renderCell = useCallback(
    (image: Record<string, unknown>, columnKey: Key) => {
      const cellValue = image[columnKey as keyof typeof image];

      switch (columnKey) {
        case "image":
          return (
            <Image
              src={`${cellValue}`}
              alt="image"
              width={100}
              height={50}
              className="rounded-lg"
              style={{ objectFit: "cover" }}
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
              onPressButtonDetail={() => push(`/admin/image/${image._id}`)}
              onPressButtonDelete={() => {
                setSelectedId(`${image._id}`);
                deleteImageModal.onOpen();
              }}
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [push, setSelectedId, deleteImageModal],
  );

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          columns={COLUMN_LISTS_IMAGE}
          emptyContent="Image is empty"
          isLoading={isLoadingImage || isRefetchingImage}
          data={dataImage?.data || []}
          onClickButtonTopContent={addImageModal.onOpen}
          buttonTopContentLabel="Create Image"
          renderCell={renderCell}
          totalPages={dataImage?.pagination.totalPages}
        />
      )}
      <AddImageModal {...addImageModal} refetchImages={refetchImages} />
      {/* <DeleteImageModal
        {...deleteImageModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchImages={refetchImages}
      /> */}
    </section>
  );
};

export default Img;
