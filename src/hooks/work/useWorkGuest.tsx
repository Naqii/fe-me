import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import workServices from "@/services/work.service";
import { useMemo } from "react";
import { IWork } from "@/types/Work";
import useChangeUrl from "../useChangeUrl";

const useWorkGuest = () => {
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

  const {
    data: dataWork,
    isLoading: isLoadingWork,
    refetch: refetchWorks,
  } = useQuery({
    queryKey: ["Work", currentSearch],
    queryFn: () => getWork(),
    enabled: router.isReady,
  });

  const displayWork: IWork[] = useMemo(() => {
    return (dataWork?.data ?? []).filter((work: IWork) => work.isShow === true);
  }, [dataWork]);

  return {
    displayWork,
    isLoadingWork,
    refetchWorks,
  };
};

export default useWorkGuest;
