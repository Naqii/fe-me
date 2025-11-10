import { LIMIT_IMAGE, PAGE_DEFAULT } from "@/constants/list.constants";
import imageServices from "@/services/image.services";
import { useQuery } from "@tanstack/react-query";

const useHome = () => {
  const getImage = async (params: string) => {
    const res = await imageServices.getImage(params);
    const { data } = res;
    return data;
  };

  const currentImageQuery = `limit=${LIMIT_IMAGE}&page=${PAGE_DEFAULT}`;

  const { data: dataImage, isLoading: isLoadingImage } = useQuery({
    queryKey: ["Image"],
    queryFn: () => getImage(`${currentImageQuery}`),
  });

  return {
    dataImage,
    isLoadingImage,
  };
};

export default useHome;
