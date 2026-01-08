import { useQuery } from "@tanstack/react-query";
import workServices from "@/services/work.service";
import { IWork } from "@/types/Work";

interface WorkResponse {
  data: IWork[];
  pagination: {
    totalPages: number;
  };
}

const normalizeIsShow = (value: unknown): boolean => {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") return value === "true";
  return false;
};

const useWorkGuest = () => {
  const query = useQuery<WorkResponse>({
    queryKey: ["work"],
    queryFn: async () => {
      const res = await workServices.getWork();

      return {
        ...res.data,
        data: res.data.data.map((work: IWork) => ({
          ...work,
          isShow: normalizeIsShow(work.isShow),
        })),
      };
    },
  });

  const visibleWorks = query.data?.data.filter((work) => work.isShow) ?? [];

  return {
    dataWork: query.data,
    works: visibleWorks,
    isLoadingWork: query.isLoading,
    isRefetchingWork: query.isRefetching,
  };
};

export default useWorkGuest;
