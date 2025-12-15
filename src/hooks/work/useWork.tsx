import { useRouter } from "next/router";
import useChangeUrl from "../useChangeUrl";
import { useQuery } from "@tanstack/react-query";
import workServices from "@/services/work.service";

const useWork = () => {
  const router = useRouter();
  const { currentSearch } = useChangeUrl();

  const getWork = async () => {
    let params = ``;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    const res = await workServices.getWork(params);
    const { data } = res;
    return data;
  };

  const { data: dataWork, isLoading: isLoadingWork } = useQuery({
    queryKey: ["Work", currentSearch],
    queryFn: () => getWork(),
    enabled: router.isReady,
  });

  return {
    dataWork,
    isLoadingWork,
  };
};

export default useWork;
