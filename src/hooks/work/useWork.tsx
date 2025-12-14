import { useRouter } from "next/router";
import { useState } from "react";
import useChangeUrl from "../useChangeUrl";
import { useQuery } from "@tanstack/react-query";
import workServices from "@/services/work.service";

const useWork = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const router = useRouter();
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const getWork = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
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
    isRefetching: isRefetchingWork,
    refetch: refetchWorks,
  } = useQuery({
    queryKey: ["Work", currentPage, currentLimit, currentSearch],
    queryFn: () => getWork(),
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  return {
    dataWork,
    isLoadingWork,
    isRefetchingWork,
    refetchWorks,

    selectedId,
    setSelectedId,
  };
};

export default useWork;
