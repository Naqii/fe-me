import { ReactNode, useMemo } from "react";
import Image from "next/image";
import useChangeUrl from "@/hooks/useChangeUrl";
import { Input, Pagination, Select, SelectItem } from "@heroui/react";
import { CiSearch } from "react-icons/ci";
import { LIMIT_LIST } from "@/constants/list.constants";
import { IImage } from "@/types/Image";

interface PropTypes {
  emptyContent: string;
  images: IImage[];
  isLoading?: boolean;
  showLimit?: boolean;
  showSearch?: boolean;
  totalPages: number;
  loadingContent?: ReactNode;
}

const GalleryMasonry = (props: PropTypes) => {
  const {
    currentLimit,
    currentPage,
    handleChangeLimit,
    handleChangePage,
    handleSearch,
    handleClearSearch,
  } = useChangeUrl();

  const {
    emptyContent,
    images,
    isLoading = false,
    totalPages,
    showLimit = true,
    showSearch = true,
    loadingContent,
  } = props;

  const hasImages = images.length > 0;

  const TopContent = useMemo(
    () =>
      showSearch && (
        <Input
          isClearable
          className="w-full sm:max-w-[24%]"
          placeholder="Search by name"
          startContent={<CiSearch />}
          onClear={handleClearSearch}
          onChange={handleSearch}
          aria-label="Search by name"
        />
      ),
    [handleClearSearch, handleSearch, showSearch],
  );

  const BottomContent = useMemo(
    () => (
      <div className="block lg:flex lg:items-center lg:justify-between">
        {showLimit && (
          <Select
            className="mb-2 max-w-36 lg:block"
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
    ),
    [
      showLimit,
      currentLimit,
      handleChangeLimit,
      totalPages,
      currentPage,
      handleChangePage,
    ],
  );

  const renderContent = () => {
    if (!hasImages) {
      return (
        <div className="text-muted-foreground py-6 text-center text-sm">
          {emptyContent}
        </div>
      );
    }

    return (
      <div className="relative">
        {isLoading && loadingContent && (
          <div className="pointer-events-none absolute inset-0 z-10">
            {loadingContent}
          </div>
        )}

        <div className="columns-1 gap-6 [column-fill:balance] sm:columns-2 md:columns-3 lg:columns-4">
          {images.map((img, idx) => {
            const id = img._id ?? idx.toString();
            const src =
              (typeof img.image === "string" ? img.image : null) ||
              (typeof img.image === "object" && img.image?.url) ||
              null;

            if (!src) return null;

            return (
              <figure
                key={id}
                className="group relative mb-6 break-inside-avoid overflow-hidden rounded-xl shadow-sm ring-1 ring-black/5 transition hover:shadow-md dark:ring-white/10"
              >
                <Image
                  src={src}
                  alt={img.title ?? "image"}
                  width={800}
                  height={600}
                  sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw"
                  className="block h-auto w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />

                {(img.title || img.isShow) && (
                  <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 m-2 rounded-lg bg-black/40 p-2 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <span className="line-clamp-1">{img.title ?? ""}</span>
                  </figcaption>
                )}
              </figure>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <section>
      <div className="mb-4">{TopContent}</div>
      {isLoading && loadingContent && !hasImages ? (
        <div className="relative min-h-[200px]">{loadingContent}</div>
      ) : (
        renderContent()
      )}
      <div className="mt-4">{BottomContent}</div>
    </section>
  );
};

export default GalleryMasonry;
