import axios from "axios";
// import * as global from "../serviceHelpers/serviceHelpers.js";
let rootPath = "/api/address/";

const create = payload => {
  const config = {
    data: payload,
    url: rootPath,
    method: "post",
    headers: { "Content-Type": "application/json" }
  };
  return axios(config);
};

const getId = id => {
  const config = {
    method: "get",
    url: rootPath + id,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config);
};

const deleteAddress = id => {
  const config = {
    method: "delete",
    url: rootPath + id,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config);
};

const update = (payload, id) => {
  const config = {
    data: payload,
    url: rootPath + id,
    method: "put",
    headers: { "Content-Type": "application/json" }
  };
  return axios(config);
};

const getPage = payload => {
  const config = {
    data: payload,
    url: rootPath + "pagination",
    method: "post",
    headers: { "Content-Type": "application/json" }
  };
  return axios(config);
};

const getAll = () => {
  const config = {
    url: rootPath,
    method: "get",
    headers: { "Content-Type": "application/json" }
  };
  return axios(config);
};

export { create, getId, deleteAddress, update, getPage, getAll };
