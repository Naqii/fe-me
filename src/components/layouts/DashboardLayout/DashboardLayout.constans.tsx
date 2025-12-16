import { CiImageOn, CiVideoOn } from "react-icons/ci";
import { BsPersonWorkspace } from "react-icons/bs";

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
  {
    key: "works",
    label: "Work",
    href: "/admin/work",
    icon: <BsPersonWorkspace />,
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
    href: "/admin/video",
    icon: <CiVideoOn />,
  },
  {
    key: "works",
    label: "Work",
    href: "/member/work",
    icon: <BsPersonWorkspace />,
  },
];

export { SIDEBAR_ADMIN, SIDEBAR_MEMBER };
