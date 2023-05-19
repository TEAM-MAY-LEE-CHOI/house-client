<template>
  <b-tr>
    <!-- <b-td>{{ id }}</b-td> -->
    <b-th class="text-left">
      <router-link :to="{ name: 'boardview', params: { id: id } }">{{
        id
      }}</router-link>
    </b-th>
    <b-td>{{ authorName }}</b-td>
    <b-td>{{ title }}</b-td>
    <b-td>{{ content }}</b-td>
    <b-td>{{ createdDate | dateFormat }}</b-td>
    <b-td>{{ lastModifiedDate | dateFormat }}</b-td>
  </b-tr>
</template>

<script>
import moment from "moment";

export default {
  name: "BoardListItem",
  props: {
    // articleno: Number,
    // userid: String,
    // subject: String,
    // hit: Number,
    // regtime: String,
    id: Number,
    authorName: String,
    title: String,
    content: String,
    createdDate: String, // String?
    lastModifiedDate: String,
  },
  filters: {
    dateFormat(regtime) {
      return moment(new Date(regtime)).format("YY.MM.DD");
    },
  },
};
</script>

<style></style>
