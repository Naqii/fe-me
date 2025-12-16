import { ToasterContext } from "@/contexts/ToasterContext";
import workServices from "@/services/work.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteWorkModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteWork = async (id: string) => {
    const res = await workServices.deleteWork(id);

    return res;
  };

  const {
    mutate: mutateDeleteWork,
    isPending: isPendingMutateDeleteWork,
    isSuccess: isSuccessMutateDeleteWork,
  } = useMutation({
    mutationFn: deleteWork,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Work Deleted",
      });
    },
  });

  return {
    mutateDeleteWork,
    isPendingMutateDeleteWork,
    isSuccessMutateDeleteWork,
  };
};

export default useDeleteWorkModal;
