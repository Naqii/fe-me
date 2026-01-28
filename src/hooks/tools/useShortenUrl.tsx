import shortenServices from "@/services/shorten.services";
import { IShorten } from "@/types/Shorten";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const shortenSchema = Yup.object().shape({
  originalUrl: Yup.string()
    .required("Please input your Url")
    .url("Your Url is invalid"),
  customAlias: Yup.string()
    .matches(/^[a-zA-Z0-9 _-]+$/, "Cant use symbol @#*&^..etc only _ -")
    .optional(),
});

const useShortenUrl = ({
  setShortenedUrl,
}: {
  setShortenedUrl: (url: string) => void;
}) => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(shortenSchema),
    defaultValues: {
      originalUrl: "",
      customAlias: "",
    },
  });

  const urlShortenServices = async (payload: IShorten) => {
    try {
      const result = await shortenServices.makeShort(payload);
      return result;
    } catch (error) {
      throw error; // tetap dilempar ke react-query
    }
  };

  //dari react-quary untuk mutasi/perubahan data disisi backend
  const { mutate: mutateShorten, isPending: isPendingShorten } = useMutation({
    mutationFn: urlShortenServices,
    onError(error) {
      setError("root", {
        message: error.message,
      });
    },
    onSuccess: (data) => {
      router.push("/tools");
      const newUrl = data?.data?.data?.newUrl;
      // console.log("API response", data.data);
      // console.log('newUrl:', newUrl);
      if (newUrl) {
        setShortenedUrl(newUrl);
      }
      reset();
    },
  });

  const handleSubmitUrl = (data: IShorten) => mutateShorten(data);

  return {
    control,
    handleSubmit,
    handleSubmitUrl,
    isPendingShorten,
    errors,
  };
};

export default useShortenUrl;
