import { memberInstance } from "./index.js";
import qs from "qs";

const api = memberInstance();

async function login(user, success, fail) {
  await api.post(`/login`, qs.stringify(user)).then(success).catch(fail);
}

async function regist(user, success, fail) {
  await api.post(`/regist`, qs.stringify(user)).then(success).catch(fail);
}

async function findById(userid, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.get(`/user/info/${userid}`).then(success).catch(fail);
}

async function tokenRegeneration(user, success, fail) {
  api.defaults.headers["refresh-token"] =
    sessionStorage.getItem("refresh-token"); //axios header에 refresh-token 셋팅
  await api.post(`/user/refresh`, user).then(success).catch(fail);
}

async function logout(userid, success, fail) {
  await api.get(`/mylogout`).then(success).catch(fail);
}

export { login, findById, regist, tokenRegeneration, logout };
