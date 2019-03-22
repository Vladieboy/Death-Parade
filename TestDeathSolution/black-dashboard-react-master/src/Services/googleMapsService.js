import axios from "axios";

import * as secrets from "./superSecretKeys";

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
  return axios(config);
};
export { geoLocation };
