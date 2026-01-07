import { ToasterContext } from "@/contexts/ToasterContext";
import workServices from "@/services/work.service";
import { IWork } from "@/types/Work";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

const useDetailWork = () => {
  const { query, isReady } = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const getWorkById = async () => {
    const { data } = await workServices.getWorkById(`${query.id}`);
    return data.data;
  };

  const { data: dataWork, refetch: refetchWorks } = useQuery({
    queryKey: ["Work"],
    queryFn: getWorkById,
    enabled: isReady,
  });

  const updateWork = async (payload: IWork) => {
    const { data } = await workServices.updateWork(`${query.id}`, payload);
    return data.data;
  };

  const {
    mutate: mutateUpdateWork,
    isPending: isPendingMutateUpdateWork,
    isSuccess: isSuccessMutateUpdateWork,
  } = useMutation({
    mutationFn: (payload: IWork) => updateWork(payload),
    onError: (error) => {
      setToaster({
        type: "error",
        message: error?.message || "An error occured",
      });
    },
    onSuccess: () => {
      refetchWorks();
      setToaster({
        type: "success",
        message: "Success update Work",
      });
    },
  });

  const handleUpdateWork = (data: IWork) => mutateUpdateWork(data);

  return {
    dataWork,

    handleUpdateWork,

    isPendingMutateUpdateWork,
    isSuccessMutateUpdateWork,
  };
};

export default useDetailWork;
