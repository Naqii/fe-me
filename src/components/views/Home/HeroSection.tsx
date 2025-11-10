const HeroSection = () => (
  <section className="relative flex flex-col justify-center overflow-hidden">
    <div className="relative z-10 container mx-auto px-4 py-20">
      <div className="flex flex-col items-center lg:flex-row">
        <div className="animate-fade-in-left lg:w-1/2">
          <h1 className="mb-6 text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
            <span className="text-gradient">
              Hi! I&apos;am Sunan Baihaqi Amrullah
            </span>{" "}
            You can call me Hq
          </h1>
          <p className="mb-8 max-w-lg text-lg text-gray-300">
            Platform digital untuk mengelola kegiatan & data generus secara
            efisien.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
