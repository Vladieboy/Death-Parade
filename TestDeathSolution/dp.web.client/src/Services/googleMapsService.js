import axios from "axios";
import * as global from "../serviceHelpers/serviceHelpers.js";
const APIkey = "AIzaSyDzdWabrdQcdh4i8pxn6iuqvIv4jY6icEU";
const APIkey2 = "AIzaSyDPt4lOsC7-Fo-BBk_WD_DeQO2ozHe2y6A";
const geoLocationAPI =
  "https://maps.googleapis.com/maps/api/geocode/json?address=";
let rootPath = "/api/routes";

const geoLocation = location => {
  const config = {
    method: "GET",

    // dataType: "json",
    url: geoLocationAPI + location + "&key=" + APIkey2,
    withCredentials: false,
    // crossDomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config)
    .then(global.onGlobalSuccess)
    .catch(global.onGlobalError);
};

const geoLocation2 = location => {
  let s = `${geoLocationAPI + location}&key=${APIkey}`;
  const config = {
    method: "Put",
    url: rootPath,
    data: { Url: s },
    headers: {
      "Content-Type": "application/json"
    }
  };

  return axios(config)
    .then(global.onGlobalSuccess)
    .catch(global.onGlobalError);
};
export { geoLocation, geoLocation2 };
