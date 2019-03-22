import DashboardMK2 from "views/DashboardMK2.jsx";
import Icons from "views/Icons.jsx";

import Notifications from "views/Notifications.jsx";

import AddressDisplay from "views/Address/AddressDisplay.jsx";
import AddressCreate from "views/Address/AddressCreation.jsx";
import Maps from "views/MyFancyMap.jsx";

import TableList from "views/TableList.jsx";
import Typography from "views/Typography.jsx";
import UserProfile from "views/UserProfile.jsx";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: DashboardMK2,
    layout: "/admin"
  },
  {
    path: "/address/display",
    name: "Address Display",
    icon: "tim-icons icon-chart-pie-36",
    component: AddressDisplay,
    layout: "/admin"
  },
  {
    path: "/maps/display",
    name: "My Fancy Maps",
    icon: "tim-icons icon-pin",
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/address/create",
    name: "Address Create",
    icon: "tim-icons icon-chart-pie-36",
    component: AddressCreate,
    layout: "/admin"
  },

  {
    path: "/icons",
    name: "Icons",
    icon: "tim-icons icon-atom",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "tim-icons icon-bell-55",
    component: Notifications,
    layout: "/admin"
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "tim-icons icon-single-02",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/tables",
    name: "Table List",
    icon: "tim-icons icon-puzzle-10",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "tim-icons icon-align-center",
    component: Typography,
    layout: "/admin"
  }
];
export default routes;