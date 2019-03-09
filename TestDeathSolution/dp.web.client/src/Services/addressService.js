import axios from "axios";
import * as global from "../serviceHelpers/serviceHelpers.js";
let rootPath = "/api/address/";

const create = payload => {
  const config = {
    data: payload,
    url: rootPath,
    method: "post",
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(global.onGlobalSuccess)
    .catch(global.onGlobalError);
};

const getId = id => {
  const config = {
    method: "get",
    url: rootPath + id,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(global.onGlobalSuccess)
    .catch(global.onGlobalError);
};

const deleteAddress = id => {
  const config = {
    method: "delete",
    url: rootPath + id,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(global.onGlobalSuccess)
    .catch(global.onGlobalError);
};

const update = (payload, id) => {
  const config = {
    data: payload,
    url: rootPath + id,
    method: "put",
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(global.onGlobalSuccess)
    .catch(global.onGlobalError);
};

const getPage = payload => {
  const config = {
    data: payload,
    url: rootPath + "pagination",
    method: "post",
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(global.onGlobalSuccess)
    .catch(global.onGlobalError);
};

const getAll = () => {
  const config = {
    url: rootPath,
    method: "get",
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(global.onGlobalSuccess)
    .catch(global.onGlobalError);
};

export { create, getId, deleteAddress, update, getPage, getAll };
