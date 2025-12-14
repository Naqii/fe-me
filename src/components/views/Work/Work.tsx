import CardWork from "@/components/ui/CardWork";
import useWork from "@/hooks/work/useWork";
import { IWork } from "@/types/Work";

const WorkPage = () => {
  const { dataWork, isLoadingWork } = useWork();

  const works: IWork[] = dataWork?.data ?? [];
  const isServer = typeof window === "undefined";
  const loading = isServer || isLoadingWork;

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

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {!loading
            ? works?.map((work) => (
                <CardWork key={`card-work-${work._id}`} works={work} />
              ))
            : Array.from({ length: 6 }).map((_, index) => (
                <CardWork
                  key={`card-work-loading-${index}`}
                  isLoading={loading}
                />
              ))}
        </div>
      </section>
    </main>
  );
};

export default WorkPage;
