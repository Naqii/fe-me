import useDetailVideo from "@/hooks/video/useDetailVideo";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
  Skeleton,
  Spinner,
  Textarea,
} from "@heroui/react";
import { useEffect } from "react";
import { Controller } from "react-hook-form";

const DetailVideo = () => {
  const {
    dataVideo,

    handleUpdateVideo,
    isPendingMutateUpdateVideo,
    isSuccessMutateUpdateVideo,

    control,
    handleSubmit,
    errors,
    reset,
    setValue,
  } = useDetailVideo();

  useEffect(() => {
    setValue("title", `${dataVideo?.title}`);
    setValue("isShow", `${dataVideo?.isShow}`);
    setValue("video", `${dataVideo?.video}`);
  }, [dataVideo, setValue]);

  useEffect(() => {
    if (isSuccessMutateUpdateVideo) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessMutateUpdateVideo]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Video Information</h1>
        <p className="text-small text-default-400 w-full">
          Manage information of this Video
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(handleUpdateVideo)}
        >
          <Skeleton isLoaded={!!dataVideo?.title} className="rounded-lg">
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Title"
                  variant="bordered"
                  labelPlacement="outside"
                  type="text"
                  isInvalid={errors.title !== undefined}
                  errorMessage={errors.title?.message}
                  className="mt-2"
                />
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataVideo} className="rounded-lg">
            <Controller
              name="isShow"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Status"
                  variant="bordered"
                  labelPlacement="outside"
                  defaultSelectedKeys={[dataVideo?.isShow ? "true" : "false"]}
                  isInvalid={errors.isShow !== undefined}
                  errorMessage={errors.isShow?.message}
                  disallowEmptySelection
                  placeholder="Choose Status"
                >
                  <SelectItem key="true">Show</SelectItem>
                  <SelectItem key="false">Hide</SelectItem>
                </Select>
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataVideo?.video} className="rounded-lg">
            <Controller
              name="video"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  label="Video Link"
                  variant="bordered"
                  type="text"
                  isInvalid={!!errors.title}
                  errorMessage={errors.title?.message}
                />
              )}
            />
          </Skeleton>

          <Button
            color="danger"
            className="disabled:bg-default-500 mt-2 bg-[#006d63]"
            type="submit"
            disabled={isPendingMutateUpdateVideo || !dataVideo?._id}
          >
            {isPendingMutateUpdateVideo ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default DetailVideo;
