import { ToasterContext } from "@/contexts/ToasterContext";
import uploadServices from "@/services/upload.services";
import { IFile } from "@/types/File";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useMediaHandling = () => {
  const { setToaster } = useContext(ToasterContext);

  const uploadFile = async (
    file: File,
    callback: (data: {
      url: string;
      publicId: string;
      resourceType: "image" | "video" | "raw";
    }) => void,
  ) => {
    const formData = new FormData();
    formData.append("file", file);
    const {
      data: {
        data: {
          url: secure_url,
          publicId: public_id,
          resourceType: resource_type,
        },
      },
    } = await uploadServices.singlePict(formData);
    callback({
      url: secure_url,
      publicId: public_id,
      resourceType: resource_type,
    });
  };

  const { mutate: mutateUploadFile, isPending: isPendingMutateUploadFile } =
    useMutation({
      mutationFn: (variables: {
        file: File;
        callback: (data: {
          url: string;
          publicId: string;
          resourceType: "image" | "video" | "raw";
        }) => void;
      }) => uploadFile(variables.file, variables.callback),
      onError: (error) => {
        setToaster({
          type: "error",
          message: error?.message || "An error occurred",
        });
      },
    });

  const uploadArchive = async (
    asset: File,
    callback: (data: {
      url: string;
      publicId: string;
      resourceType: "raw";
    }) => void,
  ) => {
    const formData = new FormData();
    formData.append("file", asset);
    const {
      data: {
        data: {
          url: secure_url,
          publicId: public_id,
          resourceType: resource_type,
        },
      },
    } = await uploadServices.singleArch(formData);
    callback({
      url: secure_url,
      publicId: public_id,
      resourceType: resource_type,
    });
  };

  const { mutate: mutateUploadAsset, isPending: isPendingMutateUploadAsset } =
    useMutation({
      mutationFn: (variables: {
        asset: File;
        callback: (data: {
          url: string;
          publicId: string;
          resourceType: "raw";
        }) => void;
      }) => uploadArchive(variables.asset, variables.callback),
      onError: (error) => {
        setToaster({
          type: "error",
          message: error?.message || "An error occurred",
        });
      },
    });

  const handleUploadFile = (
    files: FileList | undefined,
    onChange: (files: FileList | undefined) => void,
    callback: (data: {
      url: string;
      publicId: string;
      resourceType: "image" | "video" | "raw";
    }) => void,
  ) => {
    if (files && files.length !== 0) {
      onChange(files);
      mutateUploadFile({
        file: files[0],
        callback: (data) => {
          callback(data);
        },
      });
    }
  };

  const handleUploadArchive = (
    files: FileList | undefined,
    onChange: (files: FileList | undefined) => void,
    callback: (data: {
      url: string;
      publicId: string;
      resourceType: "raw";
    }) => void,
  ) => {
    if (files && files.length !== 0) {
      onChange(files);
      mutateUploadAsset({
        asset: files[0],
        callback: (data) => {
          callback(data);
        },
      });
    }
  };

  const deleteFile = async (
    file: Pick<IFile, "publicId" | "resourceType">,
    callback: () => void,
  ) => {
    const res = await uploadServices.deleteFile(file);

    if (res.data.meta.status === 200) {
      callback();
    } else {
      throw new Error("Failed to delete file");
    }
  };

  const { mutate: mutateDelete, isPending: isPendingMutateDelete } =
    useMutation({
      mutationFn: (variables: {
        file: Pick<IFile, "publicId" | "resourceType">;
        callback: () => void;
      }) => deleteFile(variables.file, variables.callback),
    });

  const handleDeleteFile = (
    file: Pick<IFile, "publicId" | "resourceType">,
    callback: (files?: FileList | undefined) => void,
  ) => {
    mutateDelete({ file, callback });
  };

  return {
    mutateUploadFile,
    isPendingMutateUploadFile,
    mutateUploadAsset,
    isPendingMutateUploadAsset,
    mutateDelete,
    isPendingMutateDelete,

    handleUploadFile,
    handleUploadArchive,
    handleDeleteFile,
  };
};

export default useMediaHandling;
