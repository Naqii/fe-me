import { IVideo } from "@/types/Video";
import { cn } from "@/utils/cn";
import { Card, CardBody, Image, Skeleton } from "@heroui/react";
import { Fragment } from "react";

interface PropTypes {
  videos?: IVideo;
  isLoading?: boolean;
  // key?: string;
}

const CardEvent = (props: PropTypes) => {
  const { videos, isLoading } = props;
  return (
    <Card
      shadow="sm"
      isPressable
      // as={Link}
      // href={`/event/${events?.slug}`}
      // key={key}
      classNames={{ body: "p-2" }}
      className={cn("cursor-pointer")}
    >
      {!isLoading ? (
        <Fragment>
          <CardBody>
            <div className="flex flex-col items-start gap-2 sm:flex-row">
              <div className="w-full sm:w-80">
                <Image
                  alt="cover"
                  src={`${videos?.thumbnail}`}
                  width={420}
                  height={180}
                  className="aspect-video w-full rounded-lg object-cover"
                  sizes="(max-width: 640px) 420px, 320px"
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col justify-center">
                <h2 className="line-clamp-1 text-sm font-semibold text-[#006d63] sm:text-base">
                  {videos?.title}
                </h2>
              </div>
            </div>
          </CardBody>
        </Fragment>
      ) : (
        <Fragment>
          <CardBody>
            <div className="flex flex-col items-start gap-2 sm:flex-row">
              <div className="w-full sm:w-80">
                <Skeleton className="bg-default-300 aspect-video w-full rounded-lg" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col justify-center">
                <Skeleton className="bg-default-300 h-6 w-3/4 rounded-lg" />
              </div>
            </div>
          </CardBody>
        </Fragment>
      )}
    </Card>
  );
};

export default CardEvent;
