import { useRouter } from "next/router";
import { useState } from "react";
import useChangeUrl from "../useChangeUrl";
import { useQuery } from "@tanstack/react-query";
import categoryServices from "@/services/category.services";

const useCategory = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const router = useRouter();
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const getCategory = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    const res = await categoryServices.getCategory(params);
    const { data } = res;
    return data;
  };

  const {
    data: dataCategory,
    isLoading: isLoadingCategory,
    isRefetching: isRefetchingCategory,
    refetch: refetchCategorys,
  } = useQuery({
    queryKey: ["Category", currentPage, currentLimit, currentSearch],
    queryFn: () => getCategory(),
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  return {
    dataCategory,
    isLoadingCategory,
    isRefetchingCategory,
    refetchCategorys,

    selectedId,
    setSelectedId,
  };
};

export default useCategory;
