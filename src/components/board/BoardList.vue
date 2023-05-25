<template>
  <b-container fluid class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show style="background-color: paleturquoise"
          ><h3 class="mb-0 pt-2">글목록</h3></b-alert
        >
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col class="text-right">
        <b-button
          class="button1"
          style="background-color: deepskyblue"
          @click="moveWrite()"
          >글쓰기</b-button
        >
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col>
        <b-table
          striped
          hover
          :items="articles"
          :fields="fields"
          @row-clicked="viewArticle">
          <template #cell(title)="data">
            <router-link
              :to="{
                name: 'boardview',
                // params: { articleno: data.item.articleno },
                params: { id: data.item.id },
              }">
              {{ data.item.title }}
            </router-link>
          </template>
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { listArticle } from "@/api/board";

export default {
  name: "BoardList",
  data() {
    return {
      articles: [],
      fields: [
        { key: "id", label: "글번호", tdClass: "tdClass" },
        { key: "authorName", label: "작성자", tdClass: "tdClass" },
        { key: "title", label: "제목", tdClass: "tdSubject" },
        { key: "content", label: "내용", tdClass: "tdContent" },
        { key: "createdDate", label: "작성일", tdClass: "tdClass" },
        { key: "lastModifiedDate", label: "수정일", tdClass: "tdClass" },
      ],
    };
  },
  created() {
    let param = {
      pg: 1,
      spp: 20,
      key: null,
      word: null,
    };
    listArticle(
      param,
      ({ data }) => {
        this.articles = data.content;
        console.log(this.articles);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  methods: {
    moveWrite() {
      this.$router.push({ name: "boardwrite" });
    },
    viewArticle(article) {
      this.$router.push({
        name: "boardview",
        params: { id: article.id },
      });
    },
  },
};
</script>

<style scope>
.tdClass {
  width: 50px;
  text-align: center;
}
.tdSubject {
  width: 100px;
  text-align: left;
}
.tdContent {
  width: 300px;
  text-align: center;
}
a {
  color: deepskyblue;
}
</style>
