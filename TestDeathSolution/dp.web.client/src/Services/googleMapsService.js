import axios from "axios";
import * as global from "../serviceHelpers/serviceHelpers.js";

import * as secrets from "./superSecretKeys";

// const APIkey = "AIzaSyDzdWabrdQcdh4i8pxn6iuqvIv4jY6icEU";

const geoLocationAPI =
  "https://maps.googleapis.com/maps/api/geocode/json?address=";
let rootPath = "/api/routes";

const geoLocation = location => {
  let s = `${geoLocationAPI + location}&key=${secrets.APIkey}`;
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
export { geoLocation };
