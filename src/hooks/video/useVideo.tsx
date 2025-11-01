import { useRouter } from "next/router";
import { useState } from "react";
import useChangeUrl from "../useChangeUrl";
import { useQuery } from "@tanstack/react-query";
import videoServices from "@/services/video.services";

const useVideo = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const router = useRouter();
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const getVideo = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    const res = await videoServices.getVideo(params);
    const { data } = res;
    return data;
  };

  const {
    data: dataVideo,
    isLoading: isLoadingVideo,
    isRefetching: isRefetchingVideo,
    refetch: refetchVideos,
  } = useQuery({
    queryKey: ["Video", currentPage, currentLimit, currentSearch],
    queryFn: () => getVideo(),
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  return {
    dataVideo,
    isLoadingVideo,
    isRefetchingVideo,
    refetchVideos,

    selectedId,
    setSelectedId,
  };
};

export default useVideo;
