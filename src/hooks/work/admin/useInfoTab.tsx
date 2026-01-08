import { toDateStandard } from "@/utils/date";
import { DateValue } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const schemaUpdateInfo = Yup.object().shape({
  title: Yup.string()
    .max(100, "Name cannot exceed 100 characters")
    .required("Please input name"),
  content: Yup.string().required("Please input link from youtube"),
  description: Yup.string().required("Please input description"),
  isShow: Yup.string().required("Please select status"),
  dateFinished: Yup.mixed<DateValue>()
    .required("Please select date finish job")
    .transform((value) => (value ? toDateStandard(value) : value)),
});

const useInfoTab = () => {
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
    controlUpdateInfo,
    handleSubmitUpdateInfo,
    errorsUpdateInfo,
    resetUpdateInfo,
    setValueUpdateInfo,
  };
};

export default useInfoTab;
