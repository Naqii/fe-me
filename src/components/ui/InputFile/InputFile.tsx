import { cn } from "@/utils/cn";
import { Button, Spinner } from "@heroui/react";
import Image from "next/image";
import { ChangeEvent, ReactNode, useId } from "react";
import { CiSaveUp2, CiTrash } from "react-icons/ci";

interface PropTypes {
  accept?: string;
  className?: string;
  errorMessage?: string;
  isDeleting?: boolean;
  isDropable?: boolean;
  isInvalid?: boolean;
  isUploading?: boolean;
  label?: ReactNode;
  name: string;
  onUpload?: (file: FileList) => void;
  onDelete?: () => void;
  preview?: string;
}

const InputFile = ({
  accept = "*/*",
  className,
  errorMessage,
  isInvalid,
  isUploading,
  isDeleting,
  label,
  name,
  onUpload,
  onDelete,
  preview,
}: PropTypes) => {
  const inputId = useId();

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && onUpload) onUpload(files);
  };

  const isImagePreview =
    typeof preview === "string" && preview.startsWith("http");

  return (
    <div>
      {label}

      <label
        htmlFor={inputId}
        className={cn(
          "relative flex min-h-28 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-gray-50 hover:bg-gray-100",
          {
            "border-danger-500": isInvalid,
            "border-gray-300": !isInvalid,
          },
          className,
        )}
      >
        {/* PREVIEW */}
        {isImagePreview && !isUploading && (
          <div className="relative flex flex-col items-center p-4">
            <Image
              src={preview}
              alt="preview"
              width={200}
              height={120}
              unoptimized
              className="rounded-lg object-cover"
            />

            {onDelete && (
              <Button
                isIconOnly
                onPress={onDelete}
                disabled={isDeleting}
                className="bg-danger-100 absolute top-2 right-2"
              >
                {isDeleting ? (
                  <Spinner
                    size="sm"
                    color="default"
                    classNames={{
                      circle1: "border-[#006d63]",
                    }}
                  />
                ) : (
                  <CiTrash className="text-danger-500 h-5 w-5" />
                )}
              </Button>
            )}
          </div>
        )}

        {/* UPLOADING */}
        {isUploading && (
          <Spinner
            color="default"
            classNames={{
              circle1: "border-[#006d63]",
            }}
          />
        )}

        {/* EMPTY STATE */}
        {!preview && !isUploading && (
          <div className="flex flex-col items-center gap-2 p-4 text-gray-500">
            <CiSaveUp2 className="h-10 w-10" />
            <p className="text-center text-sm font-semibold">
              Click to upload file
            </p>
          </div>
        )}

        <input
          id={inputId}
          name={name}
          type="file"
          className="hidden"
          accept={accept}
          onChange={handleUpload}
        />
      </label>

      {isInvalid && (
        <p className="text-danger-500 mt-1 text-xs">{errorMessage}</p>
      )}
    </div>
  );
};

export default InputFile;
