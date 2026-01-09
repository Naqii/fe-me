import { Tab, Tabs } from "@heroui/react";
import InfoTab from "./InfoTab";
import useDetailAsset from "@/hooks/asset/admin/useDetailAsset";
import ThumbnailTab from "./ThumbnailTab";
import AssetTab from "./AssetTab/AssetTab";

const DetailAsset = () => {
  const {
    dataAsset,

    handleUpdateAsset,

    isPendingMutateUpdateAsset,
    isSuccessMutateUpdateAsset,
  } = useDetailAsset();

  return (
    <Tabs aria-label="Options">
      <Tab key="info" title="Info">
        <InfoTab
          dataAsset={dataAsset}
          onUpdate={handleUpdateAsset}
          isPendingUpdate={isPendingMutateUpdateAsset}
          isSuccessUpdate={isSuccessMutateUpdateAsset}
        />
      </Tab>
      <Tab key="thumbnail" title="thumbnail">
        <ThumbnailTab
          currentThumbnail={dataAsset?.thumbnail}
          onUpdate={handleUpdateAsset}
          isPendingUpdate={isPendingMutateUpdateAsset}
          isSuccessUpdate={isSuccessMutateUpdateAsset}
        />
      </Tab>
      <Tab key="asset" title="asset">
        <AssetTab
          currentAsset={dataAsset?.asset}
          onUpdate={handleUpdateAsset}
          isPendingUpdate={isPendingMutateUpdateAsset}
          isSuccessUpdate={isSuccessMutateUpdateAsset}
        />
      </Tab>
    </Tabs>
  );
};

export default DetailAsset;
