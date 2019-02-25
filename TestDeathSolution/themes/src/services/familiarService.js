import axios from "axios";

let familiar_select = () => {
  const config = {
    method: "get",
    url: "/api/familiar/familiars",
    headers: { "Content-Type": "/application/json" }
  };
  return axios(config);
};

export { familiar_select };
