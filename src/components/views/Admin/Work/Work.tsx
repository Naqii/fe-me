import DropDownAction from "@/components/commons/DropDownAction";
import DataTable from "@/components/ui/DataTable";
import useChangeUrl from "@/hooks/useChangeUrl";
import useWorkAdmin from "@/hooks/work/admin/useWork";
import { Chip, useDisclosure } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LISTS_WORK } from "./Work.constant";

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

  const { setUrl } = useChangeUrl();

  const addWorkModal = useDisclosure();
  const deleteWorkModal = useDisclosure();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const renderCell = useCallback(
    // eslint-disable-next-line react-hooks/preserve-manual-memoization
    (work: Record<string, unknown>, columnKey: Key) => {
      const cellValue = work[columnKey as keyof typeof work];
      switch (columnKey) {
        case "thumbnail":
          return (
            <Image
              src={`${cellValue}`}
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
          columns={COLUMN_LISTS_WORK}
          emptyContent="Work is Empty"
          isLoading={isLoadingWork || isRefetchingWork}
          data={dataWork?.data}
          onClickButtonTopContent={addWorkModal.onOpen}
          buttonTopContentLabel="Create Work"
          renderCell={renderCell}
          totalPages={dataWork?.pagination.totalPages}
        />
      )}
    </section>
  );
};

export default Work;
