import { Package, List, PlusCircle, Video, Upload } from "lucide-react";
const NAV_MAIN = [
  {
    id: "items-section",
    title: "Items",
    url: "#items",
    icon: Package,
    items: [
      {
        id: "item-form",
        title: "Add Item",
        url: "#item-form",
        icon: PlusCircle,
      },
      {
        id: "item-list",
        title: "Item List",
        url: "#item-list",
        icon: List,
      },
    ],
  },
  {
    id: "videos-section",
    title: "Videos",
    url: "#videos",
    icon: Video,
    items: [
      {
        id: "video-form",
        title: "Upload Video",
        url: "#video-form",
        icon: Upload,
      },
    ],
  },
];
export { NAV_MAIN };
