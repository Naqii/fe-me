import { toPng } from "html-to-image";

export const downloadQR = async (
  ref: React.RefObject<HTMLDivElement | null>,
  filename = "qrcode.png",
) => {
  if (!ref.current) return;

  const dataUrl = await toPng(ref.current, {
    cacheBust: true,
    backgroundColor: "#ffffff",
    pixelRatio: 2,
  });

  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  link.click();
};
