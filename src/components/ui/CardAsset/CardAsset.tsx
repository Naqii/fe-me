import { IAsset } from "@/types/Asset";
import { cn } from "@/utils/cn";
import { convertTime } from "@/utils/date";
import { Card, CardBody, CardHeader, Image, Skeleton } from "@heroui/react";
import Link from "next/link";
import { Fragment } from "react";

interface PropTypes {
  asset?: IAsset;
  isLoading?: boolean;
  // key?: string;
}

const CardAsset = (props: PropTypes) => {
  const { asset, isLoading } = props;
  return (
    <Card
      shadow="md"
      isPressable
      as={Link}
      href={`/assets/${asset?._id}`}
      // key={key}
      className={cn("flex h-full cursor-pointer flex-col")}
    >
      {!isLoading && asset ? (
        <Fragment>
          <CardHeader className="flex-col items-start px-4 pt-2 pb-0">
            <h2 className="line-clamp-1 text-sm font-semibold text-[#006d63] sm:text-base">
              {asset.title}
            </h2>
            <small className="text-foreground-500">
              {convertTime(`${asset?.updated}`)}
            </small>
          </CardHeader>

          <CardBody className="flex flex-1 py-2">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              <Image
                alt={asset.title}
                src={`${asset?.thumbnail?.url}`}
                removeWrapper
                className="h-full w-full object-cover"
              />
            </div>
          </CardBody>
        </Fragment>
      ) : (
        <Fragment>
          <CardHeader className="flex-col items-start px-4 pt-3 pb-1">
            <Skeleton className="h-4 w-3/4 rounded-md" />
            <Skeleton className="mt-1 h-3 w-1/2 rounded-md" />
          </CardHeader>

          <CardBody className="flex flex-1 py-2">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              <Skeleton className="h-full w-full rounded-lg" />
            </div>
          </CardBody>
        </Fragment>
      )}
    </Card>
  );
};

export default CardAsset;
