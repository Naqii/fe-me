import YouTubeEmbed from "@/components/ui/YoutubeEmbed";
import useDetailWork from "@/hooks/work/useDetailWork";
import { convertTime } from "@/utils/date";

const DetailWork = () => {
  const { dataWork, isLoadingWork } = useDetailWork();

  const work = dataWork;
  const hasVideo = typeof work?.content === "string";

  if (isLoadingWork || !work) {
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
      aria-busy={isLoadingWork}
      style={{ paddingTop: "var(--nav-h, 5rem)" }}
    >
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="mb-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#006d63] sm:text-4xl">
              {work?.title}
            </h1>
            <p className="text-muted-foreground mt-1">{work?.description}</p>
            <small className="text-foreground">
              {convertTime(`${work?.dateFinished}`)}
            </small>
          </div>
        </header>
        {hasVideo && <YouTubeEmbed url={work.content} />}
      </section>
    </main>
  );
};

export default DetailWork;
