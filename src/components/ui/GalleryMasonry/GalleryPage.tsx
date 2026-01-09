import dynamic from "next/dynamic";

const GalleryMasonryClient = dynamic(
  () => import("@/components/ui/GalleryMasonry"),
  { ssr: false },
);

export default GalleryMasonryClient;
