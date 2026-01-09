import GalleryMasonryClient from "@/components/ui/GalleryMasonry/GalleryPage";
import useImageGuest from "@/hooks/image/useImageGuest";
import { Spinner } from "@heroui/react";

const GalleryPage = () => {
  const { visibleImages, isLoadingImage, isRefetchingImage } = useImageGuest();

  const totalPages = visibleImages?.pagination?.totalPages ?? 1;
  const loading = isLoadingImage || isRefetchingImage;

  return (
    <main
      role="main"
      aria-busy={loading}
      style={{ paddingTop: "var(--nav-h, 5rem)" }}
    >
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="mb-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#006d63] sm:text-4xl">
              Gallery
            </h1>
            <p className="text-muted-foreground mt-1">Curated my shots</p>
          </div>
        </header>
        <GalleryMasonryClient
          images={visibleImages}
          emptyContent="Image is empty"
          isLoading={loading}
          totalPages={totalPages}
          loadingContent={
            <div className="bg-background/60 flex h-full w-full items-center justify-center backdrop-blur-sm">
              <Spinner
                color="default"
                classNames={{
                  circle1: "border-[#006d63]",
                }}
              >
                <p className="text-muted-foreground text-sm">Loading gallery</p>
              </Spinner>
            </div>
          }
        />
      </section>
    </main>
  );
};

export default GalleryPage;
