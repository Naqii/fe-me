import { LIMIT_LIST } from "@/constants/list.constants";
import useChangeUrl from "@/hooks/useChangeUrl";
import { cn } from "@/utils/cn";
import {
  Button,
  Input,
  Pagination,
  Select,
  SelectItem,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { Key, ReactNode, useMemo } from "react";
import { CiSearch } from "react-icons/ci";
import { useTableData } from "./useTableData";

interface PropTypes {
  buttonTopContentLabel?: string;
  columns: Record<string, unknown>[];
  data: Record<string, unknown>[];
  emptyContent: string;
  isLoading?: boolean;
  onClickButtonTopContent?: () => void;
  renderCell: (item: Record<string, unknown>, columnKey: Key) => ReactNode;
  showLimit?: boolean;
  showSearch?: boolean;
  showClass?: string;
  totalPages: number;
}

const DataTable = (props: PropTypes) => {
  const {
    currentLimit,
    currentPage,

    handleChangeLimit,
    handleChangePage,
    handleSearch,
    handleClearSearch,
  } = useChangeUrl();

  const {
    buttonTopContentLabel,
    columns,
    data,
    emptyContent,
    isLoading,
    onClickButtonTopContent,
    renderCell,
    totalPages,
    showLimit = true,
    showSearch = true,
  } = props;

  const { displayedData } = useTableData(data, isLoading ?? false);

  const TopContent = useMemo(() => {
    return (
      <div className="flex flex-col-reverse items-start justify-between gap-y-4 lg:flex-row lg:items-center">
        {showSearch && (
          <Input
            isClearable
            className="w-full sm:max-w-[24%]"
            placeholder="Search by name"
            startContent={<CiSearch />}
            onClear={handleClearSearch}
            onChange={handleSearch}
            aria-label="Search by name"
          />
        )}
        {buttonTopContentLabel && (
          <Button
            className="bg-[#006d63] text-white"
            onPress={onClickButtonTopContent}
            aria-label={buttonTopContentLabel || "Perform action"}
          >
            {buttonTopContentLabel}
          </Button>
        )}
      </div>
    );
  }, [
    buttonTopContentLabel,
    handleClearSearch,
    handleSearch,
    onClickButtonTopContent,
    showSearch,
  ]);

  const BottomContent = useMemo(() => {
    return (
      <div className="flex items-center justify-center lg:justify-between">
        {showLimit && (
          <Select
            className="hidden max-w-36 lg:block"
            size="md"
            selectedKeys={[`${currentLimit}`]}
            selectionMode="single"
            onChange={handleChangeLimit}
            startContent={<p className="text-small">Show:</p>}
            disallowEmptySelection
            aria-label="Select number of items to display"
          >
            {LIMIT_LIST.map((item) => (
              <SelectItem key={item.value}>{item.label}</SelectItem>
            ))}
          </Select>
        )}
        {totalPages > 1 && (
          <Pagination
            isCompact
            showControls
            page={Number(currentPage)}
            total={totalPages}
            onChange={handleChangePage}
            loop
            variant="flat"
            aria-label="Pagination Navigation"
            classNames={{
              cursor: "bg-[#006d63] text-white shadow-md",
              item: "hover:bg-[#e6f7f5] text-[#006d63]",
            }}
          />
        )}
      </div>
    );
  }, [
    showLimit,
    currentLimit,
    handleChangeLimit,
    totalPages,
    currentPage,
    handleChangePage,
  ]);

  return (
    <Table
      bottomContent={BottomContent}
      bottomContentPlacement="outside"
      aria-label="Data Table"
      classNames={{
        base: "max-w-full transition-all",
        wrapper: cn({ "overflow-x-hidden": isLoading }),
      }}
      topContent={TopContent}
      topContentPlacement="outside"
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid as Key}>
            {(column.name ?? "Unnamed Column") as string}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent={emptyContent}
        isLoading={isLoading}
        items={displayedData}
        loadingContent={
          <div className="bg-foreground-700/30 flex h-full w-full items-center justify-center backdrop-blur-sm">
            <Spinner
              color="default"
              classNames={{
                circle1: "border-[#006d63]",
              }}
            />
          </div>
        }
      >
        {(item) => (
          <TableRow key={item._id as Key}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default DataTable;
