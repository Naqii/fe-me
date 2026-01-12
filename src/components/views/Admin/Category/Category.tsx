import DropDownAction from "@/components/commons/DropDownAction";
import DataTable from "@/components/ui/DataTable";
import useChangeUrl from "@/hooks/useChangeUrl";
import { Chip, useDisclosure } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LISTS_CATEGORY } from "./Category.constant";
import useCategory from "@/hooks/category/useCategory";
import { ICategory } from "@/types/Category";
import DeleteCategoryModal from "./DeleteCategoryModal";
import AddCategoryModal from "./AddCategoryModal";

const Category = () => {
  const { push, isReady, query } = useRouter();
  const {
    dataCategory,
    isLoadingCategory,
    isRefetchingCategory,
    refetchCategorys,

    selectedId,
    setSelectedId,
  } = useCategory();

  const addCategoryModal = useDisclosure();
  const deleteCategoryModal = useDisclosure();
  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setUrl();
      refetchCategorys();
      setSelectedId("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);

  const mappedData =
    dataCategory?.data.map((item: ICategory) => ({
      ...item,
      iconUrl: item.icon?.url,
    })) || [];

  const renderCell = useCallback(
    (category: Record<string, unknown>, columnKey: Key) => {
      const cellValue = category[columnKey as keyof typeof category];

      switch (columnKey) {
        case "iconUrl":
          return (
            <Image
              src={cellValue as string}
              alt="icon"
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
              onPressButtonDetail={() =>
                push(`/admin/category/${category._id}`)
              }
              onPressButtonDelete={() => {
                setSelectedId(`${category._id}`);
                deleteCategoryModal.onOpen();
              }}
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [push, setSelectedId, deleteCategoryModal],
  );

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          data={mappedData}
          columns={COLUMN_LISTS_CATEGORY}
          emptyContent="Category is empty"
          isLoading={isLoadingCategory || isRefetchingCategory}
          onClickButtonTopContent={addCategoryModal.onOpen}
          buttonTopContentLabel="Create Category"
          renderCell={renderCell}
          totalPages={dataCategory?.pagination.totalPages}
        />
      )}
      <AddCategoryModal
        {...addCategoryModal}
        refetchCategorys={refetchCategorys}
      />
      <DeleteCategoryModal
        {...deleteCategoryModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchCategory={refetchCategorys}
      />
    </section>
  );
};

export default Category;
