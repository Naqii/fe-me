import DropDownAction from "@/components/commons/DropDownAction";
import DataTable from "@/components/ui/DataTable";
import useChangeUrl from "@/hooks/useChangeUrl";
import { Chip, useDisclosure } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LISTS_ASSET } from "./Asset.constant";
import useAssetAdmin from "@/hooks/asset/admin/useAsset";
import DeleteAssetModal from "./DeleteAssetModal";
import AddAssetModal from "./AddAssetModal";
import { IAsset } from "@/types/Asset";

const Asset = () => {
  const { push, isReady, query } = useRouter();
  const {
    dataAsset,
    isLoadingAsset,
    isRefetchingAsset,
    refetchAssets,

    selectedId,
    setSelectedId,
  } = useAssetAdmin();

  const { setUrl } = useChangeUrl();

  const addAssetModal = useDisclosure();
  const deleteAssetModal = useDisclosure();

  useEffect(() => {
    if (isReady) {
      setUrl();
      refetchAssets();
      setSelectedId("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);

  const mappedData =
    dataAsset?.data.map((item: IAsset) => ({
      ...item,
      thumbnailUrl: item.thumbnail?.url,
    })) || [];

  const renderCell = useCallback(
    (asset: Record<string, unknown>, columnKey: Key) => {
      const cellValue = asset[columnKey as keyof typeof asset];
      switch (columnKey) {
        case "thumbnailUrl":
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
              onPressButtonDetail={() => push(`/admin/asset/${asset._id}`)}
              onPressButtonDelete={() => {
                setSelectedId(`${asset._id}`);
                deleteAssetModal.onOpen();
              }}
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [deleteAssetModal, push, setSelectedId],
  );

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          data={mappedData}
          columns={COLUMN_LISTS_ASSET}
          emptyContent="Asset is Empty"
          isLoading={isLoadingAsset || isRefetchingAsset}
          onClickButtonTopContent={addAssetModal.onOpen}
          buttonTopContentLabel="Create Asset"
          renderCell={renderCell}
          totalPages={dataAsset?.pagination.totalPages}
        />
      )}
      <AddAssetModal {...addAssetModal} refetchAsset={refetchAssets} />
      <DeleteAssetModal
        {...deleteAssetModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchAsset={refetchAssets}
      />
    </section>
  );
};

export default Asset;
