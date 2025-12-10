import CardWork from "@/components/ui/CardWork";
import useVideo from "@/hooks/video/useVideo";
import type { IVideo } from "@/types/Video";
import dynamic from "next/dynamic";

const WorkPage = () => {
  const { dataVideo, isLoadingVideo, isRefetchingVideo } = useVideo();

  const videos: IVideo[] = dataVideo?.data ?? [];
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
              Works
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Several projects I have worked on.
            </p>
          </div>
        </header>

        <div className="flex flex-col gap-3 sm:gap-4">
          {!loading
            ? videos.map((video) => <CardWork key={video._id} videos={video} />)
            : Array.from({ length: 3 }).map((_, index) => (
                <CardWork key={`loading-${index}`} isLoading />
              ))}
        </div>
      </section>
    </main>
  );
};

export default dynamic(() => Promise.resolve(WorkPage), {
  ssr: false,
});
