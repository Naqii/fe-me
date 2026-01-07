import useAssetGuest from "@/hooks/asset/useAssetGuest";

const AssetsPage = () => {
  const { dataAsset, displayAsset, isLoadingAsset, refetchAssets } =
    useAssetGuest();

  const assets = dataAsset?.data || [];
  const totalPages = dataAsset?.pagination?.totalPages ?? 1;
  const loading = isLoadingAsset;

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
              Assets
            </h1>
            <p className="text-muted-foreground mt-1">
              Several assets that I created and use in my work.
            </p>
          </div>
        </header>
      </section>
    </main>
  );
};

export default AssetsPage;
