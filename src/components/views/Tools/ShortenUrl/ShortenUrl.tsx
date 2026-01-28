import { Button, Card, CardBody, Input, Spinner } from "@heroui/react";
import { Controller } from "react-hook-form";
import { useRef, useState } from "react";
import { FaCopy } from "react-icons/fa";
import QRCode from "react-qr-code";
import { downloadQR } from "@/libs/downloadQR";
import useShortenUrl from "@/hooks/tools/useShortenUrl";

const ShortenUrl = () => {
  const [shortenedUrl, setShortenedUrl] = useState("");
  const { control, handleSubmit, handleSubmitUrl, isPendingShorten, errors } =
    useShortenUrl({
      setShortenedUrl,
    });

  // gunakan tipe nullable agar cocok dengan util downloadQR
  const qrRef = useRef<HTMLDivElement | null>(null);

  return (
    <section className="mb-16">
      <Card>
        <CardBody className="p-6">
          <form className="w-full" onSubmit={handleSubmit(handleSubmitUrl)}>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
              {/* Left: input fields dan tombol Generate */}
              <div className="flex flex-1 flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div>
                    <h2 className="text-lg font-bold">URL Shortener</h2>
                    <p className="text-muted-foreground text-sm">
                      Paste link lalu generate
                    </p>
                  </div>
                </div>

                <Controller
                  name="originalUrl"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="URL"
                      type="text"
                      variant="bordered"
                      autoComplete="off"
                      isInvalid={errors.originalUrl !== undefined}
                      errorMessage={errors.originalUrl?.message}
                    />
                  )}
                />

                <Controller
                  name="customAlias"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Alias (optional)"
                      type="text"
                      variant="bordered"
                      autoComplete="off"
                      isInvalid={!!errors.customAlias}
                      errorMessage={errors.customAlias?.message}
                    />
                  )}
                />

                <div className="flex w-full items-center gap-2">
                  <Input
                    id="shortenedUrl"
                    isDisabled
                    className="flex-1"
                    variant="bordered"
                    type="text"
                    value={shortenedUrl}
                    aria-label="Shortened URL"
                  />

                  <Button
                    onPress={() => navigator.clipboard.writeText(shortenedUrl)}
                    disabled={!shortenedUrl}
                    className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors duration-200 ${
                      shortenedUrl
                        ? "bg-primary text-white hover:bg-emerald-800"
                        : "cursor-not-allowed bg-gray-300 text-gray-500"
                    }`}
                    aria-label="Copy shortened URL"
                  >
                    <FaCopy size={14} />
                  </Button>
                </div>

                {errors.root?.message && (
                  <p className="text-xs text-red-500">Alias already taken</p>
                )}

                <div>
                  <Button
                    color="primary"
                    className="focus:outline-none"
                    type="submit"
                    size="lg"
                  >
                    {isPendingShorten ? (
                      <Spinner color="white" size="md" />
                    ) : (
                      "Generate"
                    )}
                  </Button>
                </div>
              </div>

              {/* Right: hasil shortened URL + tombol copy & download + QR */}
              <div className="mt-2 flex shrink-0 flex-col items-center lg:mt-0 lg:w-96">
                <label className="sr-only" htmlFor="shortenedUrl">
                  Shortened URL
                </label>

                {shortenedUrl && (
                  <div
                    ref={qrRef}
                    className="flex flex-col items-center rounded p-4"
                  >
                    <QRCode value={shortenedUrl} size={128} />
                  </div>
                )}

                <Button
                  disabled={!shortenedUrl}
                  onPress={() => downloadQR(qrRef, "shortened-url.png")}
                  className={`mt-2 flex items-center gap-2 rounded-md px-4 py-2 transition-colors duration-200 ${
                    shortenedUrl
                      ? "bg-primary text-white hover:bg-emerald-800"
                      : "cursor-not-allowed bg-gray-300 text-gray-500"
                  }`}
                >
                  Download QR
                </Button>
              </div>
            </div>
          </form>
        </CardBody>
      </Card>
    </section>
  );
};

export default ShortenUrl;
