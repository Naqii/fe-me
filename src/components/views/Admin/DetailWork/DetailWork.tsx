import useDetailWork from "@/hooks/work/useDetailWork";
import { Tab, Tabs } from "@heroui/react";
import InfoTab from "./InfoTab";
import ThumbnailTab from "./ThumbnailTab/ThumbnailTab";

const DetailWork = () => {
  const {
    dataWork,

    handleUpdateWork,

    isPendingMutateUpdateWork,
    isSuccessMutateUpdateWork,
  } = useDetailWork();

  return (
    <Tabs aria-label="Options">
      <Tab key="info" title="Info">
        <InfoTab
          dataWork={dataWork}
          onUpdate={handleUpdateWork}
          isPendingUpdate={isPendingMutateUpdateWork}
          isSuccessUpdate={isSuccessMutateUpdateWork}
        />
      </Tab>
      <Tab key="thumbnail" title="thumbnail">
        <ThumbnailTab
          currentThumbnail={dataWork?.thumbnail}
          onUpdate={handleUpdateWork}
          isPendingUpdate={isPendingMutateUpdateWork}
          isSuccessUpdate={isSuccessMutateUpdateWork}
        />
      </Tab>
    </Tabs>
  );
};

export default DetailWork;
