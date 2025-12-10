import useVideo from "@/hooks/video/useVideo";

const AssetsPage = () => {
  const { dataVideo, isLoadingVideo, isRefetchingVideo } = useVideo();

  const videos = dataVideo?.data || [];
  const totalPages = dataVideo?.pagination?.totalPages ?? 1;
  const loading = isLoadingVideo || isRefetchingVideo;

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
              Assets
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Several assets that I created and use in my work.
            </p>
          </div>
        </header>
      </section>
    </main>
  );
};

export default AssetsPage;
