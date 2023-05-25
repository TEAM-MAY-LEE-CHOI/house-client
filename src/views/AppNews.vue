<template>
  <b-container
    class="mt-4"
    style="
      border: 3px solid lightgray;
      border-radius: 10px;
      background-color: aliceblue;
    ">
    <div class="mt-3">
      <h3 class="font1 underline-steelblue">
        <b-icon icon="newspaper"></b-icon> 뉴스
      </h3>
    </div>
    <div
      class="news bv-example-row mt-3 text-center border p-3"
      style="overflow: scroll; height: 80vh; background-color: white">
      <b-list-group v-for="news in newsList" :key="news" class="mb-3">
        <b-list-group-item
          class="font1 mb-0 p-1"
          style="border: 2px solid lightgray; background-color: aliceblue">
          <a :href="news.link"
            ><h4 class="mb-0 mt-2" v-html="news.title"></h4></a
        ></b-list-group-item>
        <b-list-group-item class="font1">
          <div v-html="news.description"></div
        ></b-list-group-item>
      </b-list-group>
    </div>
  </b-container>
</template>

<script>
const houseStore = "houseStore";
import { mapState } from "vuex";

export default {
  name: "AppNews",
  computed: {
    ...mapState(houseStore, ["newsList"]),
  },
};
</script>

<style scoped>
a {
  color: deepskyblue;
}
b {
  color: red;
}
.news::-webkit-scrollbar {
  display: none;
}
</style>
