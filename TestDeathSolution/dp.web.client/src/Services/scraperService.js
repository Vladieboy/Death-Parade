import axios from "axios";
import * as global from "../serviceHelpers/serviceHelpers.js";
let rootpath = "/api/scraper/";

let redditScraper = () => {
  const config = {
    url: rootpath + "reddit",
    method: "get",
    headers: { "Content-Type": "/application/json" }
  };
  return axios(config);
};

let symbolScraper = () => {
  const config = {
    url: rootpath + "symbols",
    method: "get",
    headers: { "Content-Type": "/application/json" }
  };
  return axios(config);
};

let horoscopeScraper = () => {
  const config = {
    url: rootpath + "horoscope",
    method: "get",
    headers: { "Content-Type": "/application/json" }
  };
  return axios(config)
    .then(global.onGlobalSuccess)
    .catch(global.onGlobalError);
};

export { redditScraper, symbolScraper, horoscopeScraper };
