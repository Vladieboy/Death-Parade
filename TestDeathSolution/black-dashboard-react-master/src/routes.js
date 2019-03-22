import DashboardMK2 from "views/DashboardMK2.jsx";

import Notifications from "views/Notifications.jsx";
import AddressDisplay from "views/Address/AddressDisplay.jsx";
import AddressCreate from "views/Address/AddressCreation.jsx";
import Maps from "views/MyFancyMap.jsx";

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
    icon: "tim-icons icon-istanbul",
    component: AddressDisplay,
    layout: "/admin"
  },
  {
    path: "/address/create",
    name: "Address Create",
    icon: "tim-icons icon-map-big",
    component: AddressCreate,
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
    path: "/notifications",
    name: "Notifications",
    icon: "tim-icons icon-bell-55",
    component: Notifications,
    layout: "/admin"
  }
];
export default routes;
