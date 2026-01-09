import categoryServices from "@/services/category.service";
import { toDateStandard } from "@/utils/date";
import { DateValue } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const schemaUpdateInfo = Yup.object().shape({
  title: Yup.string()
    .max(100, "Name cannot exceed 100 characters")
    .required("Please input name"),
  category: Yup.string().required("Please chose category"),
  isShow: Yup.string().required("Please select status"),
  updated: Yup.mixed<DateValue>()
    .required("Please select lastest update")
    .transform((value) => (value ? toDateStandard(value) : value)),
});

const useInfoTab = () => {
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState("");

  const { data: dataCategory } = useQuery({
    queryKey: ["category"],
    queryFn: () => categoryServices.getCategory(),
    enabled: router.isReady,
  });

  const {
    control: controlUpdateInfo,
    handleSubmit: handleSubmitUpdateInfo,
    formState: { errors: errorsUpdateInfo },
    reset: resetUpdateInfo,
    setValue: setValueUpdateInfo,
  } = useForm({
    resolver: yupResolver(schemaUpdateInfo),
  });

  return {
    dataCategory,

    controlUpdateInfo,
    handleSubmitUpdateInfo,
    errorsUpdateInfo,
    resetUpdateInfo,
    setValueUpdateInfo,
    selectedCategory,
    setSelectedCategory,
  };
};

export default useInfoTab;
