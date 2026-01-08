import CardWork from "@/components/ui/CardWork";
import useWorkGuest from "@/hooks/work/useWorkGuest";

const WorkPage = () => {
  const { works, isLoadingWork, isRefetchingWork } = useWorkGuest();

  const loading = isLoadingWork || isRefetchingWork;

  return (
    <main
      role="main"
      aria-busy={loading}
      style={{ paddingTop: "var(--nav-h, 5rem)" }}
    >
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight text-[#006d63] sm:text-4xl">
            Works
          </h1>
          <p className="text-muted-foreground mt-1">
            Several projects I have worked on.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {!loading && works
            ? works.map((work) => <CardWork key={work._id} work={work} />)
            : Array.from({ length: 6 }).map((_, index) => (
                <CardWork key={`work-skeleton-${index}`} isLoading />
              ))}
        </div>
      </section>
    </main>
  );
};

export default WorkPage;
