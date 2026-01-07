import workServices from "@/services/work.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useDetailWorkGuest = () => {
  const { query, isReady } = useRouter();

  const getWorkById = async () => {
    const { data } = await workServices.getWorkById(`${query.id}`);
    return data.data;
  };

  const { data: dataWork, isLoading: isLoadingWork } = useQuery({
    queryKey: ["Work", query.id],
    queryFn: getWorkById,
    enabled: isReady,
  });

  return {
    dataWork,
    isLoadingWork,
  };
};

export default useDetailWorkGuest;
