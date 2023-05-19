import { apiInstance, houseInstance } from "./index.js";

const api = apiInstance();
const house = houseInstance();

function sidoList(success, fail) {
  api.get(`/regions/sido`).then(success).catch(fail);
}

function gugunList(params, success, fail) {
  let param = { sidoCode: params.sido };
  api.get(`/regions/gugun`, { params: param }).then(success).catch(fail);
}

function houseList(params, success, fail) {
  house.get(``, { params: params }).then(success).catch(fail);
}

export { sidoList, gugunList, houseList };
