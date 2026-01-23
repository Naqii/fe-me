import useDetailAssetGuest from "@/hooks/asset/useDetailAssetGuest";
import { convertTime } from "@/utils/date";
import { Button } from "@heroui/react";
import Image from "next/image";

const DetailAssetGuest = () => {
  const { dataAsset, isLoadingAsset, downloadAsset, dataCategory } =
    useDetailAssetGuest();

  const isLoading = isLoadingAsset || !dataAsset;

  return (
    <main
      role="main"
      aria-busy={isLoading}
      style={{ paddingTop: "var(--nav-h, 5rem)" }}
      className="min-h-screen"
    >
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="space-y-8">
          {/* Header */}
          <header className="space-y-2">
            {isLoading ? (
              <>
                <div className="bg-default-300 h-10 w-2/3 rounded" />
                <div className="bg-default-300 h-4 w-1/3 rounded" />
                <div className="bg-default-300 h-3 w-1/4 rounded" />
              </>
            ) : (
              <>
                <h1 className="text-3xl font-bold tracking-tight text-[#006d63] sm:text-4xl">
                  {dataAsset.title}
                </h1>

                <p className="text-muted-foreground text-sm">
                  {dataCategory?.name
                    ? `Category Asset: ${dataCategory.name}`
                    : "Category Asset"}
                </p>

                <p className="text-muted-foreground text-sm">
                  Last updated · {convertTime(`${dataAsset.updated}`)}
                </p>
              </>
            )}
          </header>

          {/* Media */}
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black/5">
            {isLoading ? (
              <div className="bg-default-300 h-full w-full" />
            ) : (
              <Image
                src={dataAsset.thumbnail.url}
                alt={dataAsset.title}
                fill
                className="object-cover"
                priority
              />
            )}
          </div>

          {/* Action */}
          <div className="flex">
            {isLoading ? (
              <div className="bg-default-300 h-11 w-40 rounded-lg" />
            ) : (
              <Button
                onPress={downloadAsset}
                className="rounded-lg bg-[#006d63] px-6 py-3 text-sm font-semibold text-white"
              >
                Download Asset
              </Button>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default DetailAssetGuest;
