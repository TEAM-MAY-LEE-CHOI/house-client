import { apiInstance } from "./index.js";

const api = apiInstance();

function listArticle(param, success, fail) {
  api.get(`/post`, { params: param }).then(success).catch(fail);
}

function writeArticle(article, success, fail) {
  console.log(article);
  let tempArticle = {
    title: article.subject,
    content: article.content,
  };
  console.log("tempArticle", tempArticle);
  api.post(`/post`, JSON.stringify(tempArticle)).then(success).catch(fail);
}

function getArticle(id, success, fail) {
  api.get(`/post/${id}`).then(success).catch(fail);
}

function modifyArticle(id, article, success, fail) {
  api.put(`/post/${id}`, JSON.stringify(article)).then(success).catch(fail);
}

function deleteArticle(id, success, fail) {
  api.delete(`/post/${id}`).then(success).catch(fail);
}

export { listArticle, writeArticle, getArticle, modifyArticle, deleteArticle };
