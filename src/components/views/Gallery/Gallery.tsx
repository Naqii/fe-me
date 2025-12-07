import { useEffect, useState } from "react";
import GalleryMasonry from "@/components/ui/GalleryMasonry";
import useImage from "@/hooks/image/useImage";
import { Spinner } from "@heroui/react";

const GalleryPage = () => {
  const { dataImage, isLoadingImage, isRefetchingImage } = useImage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const images = dataImage?.data || [];
  const totalPages = dataImage?.pagination?.totalPages ?? 1;
  const loading = isLoadingImage || isRefetchingImage;

  if (!mounted) {
    // SSR & client render pertama akan selalu cabang ini → tidak ada mismatch
    return (
      <main
        role="main"
        aria-busy="true"
        style={{ paddingTop: "var(--nav-h, 5rem)" }}
      >
        <section className="mx-auto flex min-h-[50vh] max-w-6xl items-center justify-center px-4 sm:px-6">
          <div className="flex flex-col items-center gap-3">
            <Spinner
              color="default"
              classNames={{
                circle1: "border-[#006d63]",
              }}
            />
          </div>
        </section>
      </main>
    );
  }

  return (
    <main
      role="main"
      aria-busy={loading}
      style={{ paddingTop: "var(--nav-h, 5rem)" }}
    >
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="mb-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
              Gallery
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Curated shots from my work layout.
            </p>
          </div>
        </header>

        <GalleryMasonry
          images={images}
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
              />
            </div>
          }
        />
      </section>
    </main>
  );
};

export default GalleryPage;
