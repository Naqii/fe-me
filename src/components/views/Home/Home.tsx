import useHome from "@/hooks/home/useHome";
import HeroSection from "./HeroSection";

const Home = () => {
  const { dataImage, isLoadingImage } = useHome();

  return (
    <div>
      <HeroSection />
    </div>
  );
};

export default Home;
