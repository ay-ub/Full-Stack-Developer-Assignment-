import {
  Package,
  List,
  PlusCircle,
  Video,
  Upload,
  Sliders,
  UserCircle,
  Settings,
  Activity,
  DollarSign,
  BarChart2,
  UserPlus,
  Users,
  User,
} from "lucide-react";
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
  {
    id: "users-section",
    title: "Users",
    url: "#users",
    icon: User,
    items: [
      {
        id: "user-list",
        title: "All Users",
        url: "#user-list",
        icon: Users,
      },
      {
        id: "user-add",
        title: "Add User",
        url: "#user-add",
        icon: UserPlus,
      },
    ],
  },
  {
    id: "reports-section",
    title: "Reports",
    url: "#reports",
    icon: BarChart2,
    items: [
      {
        id: "sales-report",
        title: "Sales",
        url: "#sales-report",
        icon: DollarSign,
      },
      {
        id: "activity-report",
        title: "Activity",
        url: "#activity-report",
        icon: Activity,
      },
    ],
  },
  {
    id: "settings-section",
    title: "Settings",
    url: "#settings",
    icon: Settings,
    items: [
      {
        id: "profile-settings",
        title: "Profile",
        url: "#profile-settings",
        icon: UserCircle,
      },
      {
        id: "app-settings",
        title: "Application",
        url: "#app-settings",
        icon: Sliders,
      },
    ],
  },
];
export { NAV_MAIN };
