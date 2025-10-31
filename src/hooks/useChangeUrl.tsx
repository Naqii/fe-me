import { useRouter } from "next/router";
import { ChangeEvent } from "react";
import useDebounce from "./useDebounce";
import { DELAY, LIMIT_DEFAULT, PAGE_DEFAULT } from "@/constants/list.constants";

const useChangeUrl = () => {
  const router = useRouter();
  const debounce = useDebounce();

  const currentLimit = router.query.limit;
  const currentPage = router.query.page;
  const currentSearch = router.query.search;
  const currentStudent = router.query.student;
  const currentIsOnline = router.query.isOnline;
  const currentIsFeatured = router.query.isFeatured;
  const currentClass = Array.isArray(router.query.className)
    ? router.query.className[0]
    : router.query.className || "68ad2af44b23429a397378bc";

  const currentmonth = router.query.month;
  const currentyear = router.query.year;

  const setUrl = () => {
    router.replace({
      query: {
        limit: currentLimit || LIMIT_DEFAULT,
        page: currentPage || PAGE_DEFAULT,
        search: currentSearch || "",
      },
    });
  };

  const setUrlExplore = () => {
    router.replace({
      query: {
        limit: currentLimit || LIMIT_DEFAULT,
        page: currentPage || PAGE_DEFAULT,
        student: currentStudent || "",
        isOnline: currentIsOnline || "",
        isFeatured: currentIsFeatured || "",
      },
    });
  };

  const handleChangePage = (page: number) => {
    router.push({
      query: {
        ...router.query,
        page,
      },
    });
  };

  const handleChangeLimit = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedLimit = e.target.value;
    router.push({
      query: {
        ...router.query,
        limit: selectedLimit,
        page: PAGE_DEFAULT,
      },
    });
  };

  const handleChangeStudent = (student: string) => {
    router.push({
      query: {
        ...router.query,
        student,
        page: PAGE_DEFAULT,
      },
    });
  };

  const handleChangeIsOnline = (isOnline: string) => {
    router.push({
      query: {
        ...router.query,
        isOnline,
        page: PAGE_DEFAULT,
      },
    });
  };

  const handleChangeIsFeatured = (isFeatured: string) => {
    router.push({
      query: {
        ...router.query,
        isFeatured,
        page: PAGE_DEFAULT,
      },
    });
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debounce(() => {
      const search = e.target.value;
      router.push({
        query: {
          ...router.query,
          search,
          page: PAGE_DEFAULT,
        },
      });
    }, DELAY);
  };

  const handleClearSearch = () => {
    router.push({
      query: {
        ...router.query,
        search: "",
        page: PAGE_DEFAULT,
      },
    });
  };

  const handleChangeClass = (className: string) => {
    router.push({
      query: {
        ...router.query,
        className,
        page: PAGE_DEFAULT,
      },
    });
  };

  return {
    currentLimit,
    currentPage,
    currentSearch,
    currentClass,
    currentmonth,
    currentyear,

    setUrl,
    handleChangePage,
    handleChangeLimit,
    handleSearch,
    handleClearSearch,
    handleChangeClass,

    setUrlExplore,
    currentStudent,
    currentIsOnline,
    currentIsFeatured,
    handleChangeStudent,
    handleChangeIsOnline,
    handleChangeIsFeatured,
  };
};

export default useChangeUrl;
