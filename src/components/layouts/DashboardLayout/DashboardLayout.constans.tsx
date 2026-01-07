import { CiImageOn } from "react-icons/ci";
import { BsFileEarmarkRichtext, BsPersonWorkspace } from "react-icons/bs";

const SIDEBAR_ADMIN = [
  {
    key: "image",
    label: "Image",
    href: "/admin/image",
    icon: <CiImageOn />,
  },
  {
    key: "works",
    label: "Work",
    href: "/admin/work",
    icon: <BsPersonWorkspace />,
  },
  {
    key: "assets",
    label: "Asset",
    href: "/admin/asset",
    icon: <BsFileEarmarkRichtext />,
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
    key: "works",
    label: "Work",
    href: "/member/work",
    icon: <BsPersonWorkspace />,
  },
];

export { SIDEBAR_ADMIN, SIDEBAR_MEMBER };
