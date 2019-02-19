import axios from "axios";

export function familiar_select() {
  return axios.get("/api/familiar/familiars").then(resp => resp.data);
}

export async function familiar_select_async() {
  const resp = await axios.get("/api/familiar/familiars");
  return resp.data;
}
