import ShortenUrl from "./ShortenUrl/ShortenUrl";

const Tools = () => {
  return (
    <main role="main" style={{ paddingTop: "var(--nav-h, 5rem)" }}>
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="mb-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#006d63] sm:text-4xl">
              Tools
            </h1>
            <p className="text-muted-foreground mt-1">
              several tools you might needed
            </p>
          </div>
        </header>
        <div>
          <ShortenUrl />
        </div>
      </section>
    </main>
  );
};

export default Tools;
