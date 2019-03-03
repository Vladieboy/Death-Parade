import axios from "axios";

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

export { redditScraper, symbolScraper };
