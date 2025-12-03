import { CiImageOn, CiVideoOn } from "react-icons/ci";

const SIDEBAR_ADMIN = [
  {
    key: "image",
    label: "Image",
    href: "/admin/image",
    icon: <CiImageOn />,
  },
  {
    key: "video",
    label: "Video",
    href: "/admin/video",
    icon: <CiVideoOn />,
  },
];

const SIDEBAR_MEMBER = [
  {
    key: "image",
    label: "Image",
    href: "/member/image",
    icon: <CiImageOn />,
  },
  {
    key: "video",
    label: "Video",
    href: "/member/video",
    icon: <CiVideoOn />,
  },
];

export { SIDEBAR_ADMIN, SIDEBAR_MEMBER };
