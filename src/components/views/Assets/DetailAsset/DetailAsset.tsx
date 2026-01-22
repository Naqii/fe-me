import useDetailAssetGuest from "@/hooks/asset/useDetailAssetGuest";
import { convertTime } from "@/utils/date";
import { Button } from "@heroui/react";
import Image from "next/image";

const DetailAssetGuest = () => {
  const { dataAsset, isLoadingAsset, downloadAsset } = useDetailAssetGuest();

  if (isLoadingAsset || !dataAsset) {
    return (
      <main style={{ paddingTop: "var(--nav-h, 5rem)" }}>
        <section className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="space-y-4">
            {/* title */}
            <div className="bg-default-300 h-10 w-2/3 rounded" />

            {/* description */}
            <div className="bg-default-300 h-4 w-full rounded" />
            <div className="bg-default-300 h-4 w-5/6 rounded" />

            {/* date */}
            <div className="bg-default-300 h-3 w-1/4 rounded" />

            {/* video */}
            <div className="bg-default-300 aspect-video w-full rounded" />
          </div>
        </section>
      </main>
    );
  }

  return (
    <main
      role="main"
      aria-busy={isLoadingAsset}
      style={{ paddingTop: "var(--nav-h, 5rem)" }}
    >
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="mb-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#006d63] sm:text-4xl">
              {dataAsset?.title}
            </h1>
            <p className="text-muted-foreground mt-1">lastest update</p>
            <small className="text-foreground">
              {convertTime(`${dataAsset?.updated}`)}
            </small>
          </div>
        </header>
        <div className="relative aspect-video w-full">
          <Image
            src={dataAsset.thumbnail.url}
            alt="thumbnail"
            fill
            className="aspect-video w-full"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Button
            onPress={downloadAsset}
            className="w-fit rounded-lg bg-[#006d63] px-6 py-3 text-sm font-semibold text-white"
          >
            Download Asset
          </Button>
        </div>
      </section>
    </main>
  );
};

export default DetailAssetGuest;
