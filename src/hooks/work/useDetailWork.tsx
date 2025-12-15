import workServices from "@/services/work.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useDetailWork = () => {
  const { query, isReady } = useRouter();

  const getWorkById = async () => {
    const { data } = await workServices.getWorkById(`${query.id}`);
    return data.data;
  };

  const { data: dataDetailWork, isLoading: isLoadingDetailWork } = useQuery({
    queryKey: ["Work", query.id],
    queryFn: getWorkById,
    enabled: isReady,
  });

  return {
    dataDetailWork,
    isLoadingDetailWork,
  };
};

export default useDetailWork;
