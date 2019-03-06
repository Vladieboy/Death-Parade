// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";

import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import DashboardMK2 from "views/Dashboard/DashboardMK2.jsx";
import Reddit from "views/Reddit/Reddit";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import TableList from "views/TableList/TableList.jsx";
import Typography from "views/Typography/Typography.jsx";
import Icons from "views/Icons/Icons.jsx";
import Maps from "views/Maps/MyFancyMap.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";
import SpellbookPage from "views/Spellbook/Spellbook";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.jsx";
import Address from "views/Addresses/AddressCreation.jsx";
import AddressDisplayContainer from "views/Addresses/AddressDisplayContainer.jsx";

// core components/views for RTL layout
import RTLPage from "views/RTLPage/RTLPage.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/dashboardmk2",
    name: "Dashboard 2",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardMK2,
    layout: "/admin"
  },
  {
    path: "/reddit",
    name: "Reddit",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: Reddit,
    layout: "/admin"
  },
  {
    path: "/address",
    name: "Address",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: Address,
    layout: "/admin"
  },
  {
    path: "/address/:uid",
    name: "Edit Address",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: Address,
    layout: "/admin"
  },
  {
    path: "/addressDisplay",
    name: "Address Display",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: AddressDisplayContainer,
    layout: "/admin"
  },
  {
    path: "/spellbook",
    name: "Spellbook",
    icon: "fas fa-book-dead",
    component: SpellbookPage,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "Table List",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/typography",
    name: "Typography",
    rtlName: "طباعة",
    icon: LibraryBooks,
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    rtlName: "الرموز",
    icon: BubbleChart,
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    rtlName: "خرائط",
    icon: LocationOn,
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "إخطارات",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/admin"
  }
];

export default dashboardRoutes;
