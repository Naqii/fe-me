import DropDownAction from "@/components/commons/DropDownAction";
import DataTable from "@/components/ui/DataTable";
import useChangeUrl from "@/hooks/useChangeUrl";
import useWorkAdmin from "@/hooks/work/admin/useWork";
import { Chip, useDisclosure } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LISTS_WORK } from "./Work.constant";
import AddWorkModal from "./AddWorkModal";
import DeleteWorkModal from "./DeleteWorkModal";
import { IWork } from "@/types/Work";

const Work = () => {
  const { push, isReady, query } = useRouter();
  const {
    dataWork,
    isLoadingWork,
    isRefetchingWork,
    refetchWorks,

    selectedId,
    setSelectedId,
  } = useWorkAdmin();

  const addWorkModal = useDisclosure();
  const deleteWorkModal = useDisclosure();
  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setUrl();
      refetchWorks();
      setSelectedId("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);

  const mappedData =
    dataWork?.data.map((item: IWork) => ({
      ...item,
      thumbnailUrl: item.thumbnail?.url,
    })) || [];

  const renderCell = useCallback(
    (work: Record<string, unknown>, columnKey: Key) => {
      const cellValue = work[columnKey as keyof typeof work];
      switch (columnKey) {
        case "thumbnailUrl":
          return (
            <Image
              src={cellValue as string}
              alt="thumbnail"
              width={200}
              height={100}
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
              onPressButtonDetail={() => push(`/admin/work/${work._id}`)}
              onPressButtonDelete={() => {
                setSelectedId(`${work._id}`);
                deleteWorkModal.onOpen();
              }}
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [push],
  );

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          data={mappedData}
          columns={COLUMN_LISTS_WORK}
          emptyContent="Work is Empty"
          isLoading={isLoadingWork || isRefetchingWork}
          onClickButtonTopContent={addWorkModal.onOpen}
          buttonTopContentLabel="Create Work"
          renderCell={renderCell}
          totalPages={dataWork?.pagination.totalPages}
        />
      )}
      <AddWorkModal {...addWorkModal} refetchWork={refetchWorks} />
      <DeleteWorkModal
        {...deleteWorkModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchWork={refetchWorks}
      />
    </section>
  );
};

export default Work;
