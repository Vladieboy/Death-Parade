import AddLocation from "@material-ui/icons/AddLocation";
import MapIcon from "@material-ui/icons/Map";
import Place from "@material-ui/icons/Place";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import StarHalf from "@material-ui/icons/StarHalf";
import InfoIcon from "@material-ui/icons/Info";
import Addresses from "./Components/Addresses/AddressDisplayContainer";
import AddAddress from "./Components/Addresses/AddressCreation";
import Maps from "./Components/Maps/MyFancyMap";
import Reddit from "./Components/Reddit/Reddit";
import Horoscope from "./Components/Horoscope/HoroscopeDisplayContainer";
import DashBoard from "./Components/Dashboard/DashboardMK2";

var mainList = [
  {
    path: "/maps",
    nav: true,
    component: Maps,
    icon: MapIcon,
    name: "Maps"
  },
  {
    path: "/address",
    nav: true,
    component: Addresses,
    icon: Place,
    name: "Address"
  },
  {
    path: "/address/add",
    nav: true,
    component: AddAddress,
    icon: AddLocation,
    name: "Add an Address"
  },
  {
    path: "/reddit",
    nav: true,
    component: Reddit,
    icon: LibraryBooks,
    name: "Reddit"
  },
  {
    path: "/horoscope",
    nav: true,
    component: Horoscope,
    icon: StarHalf,
    name: "Horoscope"
  },
  {
    path: "/",
    nav: false,
    component: DashBoard,
    icon: InfoIcon,
    name: "Dashboard"
  }
];

export default mainList;
