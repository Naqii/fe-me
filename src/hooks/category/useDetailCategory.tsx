import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext } from "react";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ToasterContext } from "@/contexts/ToasterContext";
import useMediaHandling from "../useMediaHandling";
import { ICategory } from "@/types/Category";
import categoryServices from "@/services/category.services";

const schema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  icon: yup
    .object({
      url: yup.string().required(),
      publicId: yup.string().required(),
      resourceType: yup.string().oneOf(["image", "video", "raw"]).required(),
    })
    .required("Please upload icon"),
});

type FormValues = yup.InferType<typeof schema>;

const useDetailCategory = () => {
  const { query, isReady } = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const {
    isPendingMutateUploadFile,
    isPendingMutateDelete,
    handleUploadFile,
    handleDeleteFile,
  } = useMediaHandling();

  const form = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const { setValue, getValues, watch } = form;

  // eslint-disable-next-line react-hooks/incompatible-library
  const preview = watch("icon")?.url;

  const { data: dataCategory } = useQuery<ICategory>({
    queryKey: ["category-detail", query.id],
    enabled: isReady && !!query.id,
    queryFn: async () => {
      const { data } = await categoryServices.getCategoryById(`${query.id}`);
      return data.data;
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (payload: ICategory) => {
      const { data } = await categoryServices.updateCategory(
        String(query.id),
        payload,
      );
      return data.data;
    },
    onSuccess: () => {
      setToaster({ type: "success", message: "Category updated successfully" });
    },
    onError: (error) => {
      setToaster({
        type: "error",
        message: error?.message || "Failed to update Category",
      });
    },
  });

  const handleUploadIcon = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (data) => {
      setValue(
        "icon",
        {
          url: data.url,
          publicId: data.publicId,
          resourceType: data.resourceType,
        },
        { shouldValidate: true },
      );
    });
  };

  const handleDeleteIcon = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    const icon = getValues("icon");

    if (!icon?.publicId || !icon?.resourceType) return;

    handleDeleteFile(
      {
        publicId: icon.publicId,
        resourceType: icon.resourceType,
      },
      () => onChange(undefined),
    );
  };

  return {
    dataCategory,
    form,
    preview,
    handleUploadIcon,
    handleDeleteIcon,
    isPendingMutateUploadFile,
    isPendingMutateDelete,
    ...updateMutation,
  };
};

export default useDetailCategory;
