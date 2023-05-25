<template>
  <b-container fluid class="custom-container bv-example-row mt-3 text-center">
    <h3 class="font1 underline-orange">
      <b-icon icon="house-fill"></b-icon> House Service
    </h3>
    <b-row>
      <b-col>
        <house-search-bar></house-search-bar>
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <!-- 카카오맵 -->
      <b-col id="id2" v-if="house" cols="9">
        <the-kakao-map :houses="houses"></the-kakao-map>
      </b-col>
      <b-col id="id2" v-else cols="12">
        <the-kakao-map :houses="houses"></the-kakao-map>
      </b-col>
      <b-col id="id1" v-if="house" cols="3" align="left">
        <router-link :to="{ name: 'news' }" class="link">
          <b-button link-router class="font1 button1 mb-2"
            >현재 지역 뉴스 보기</b-button
          >
        </router-link>
        <div
          style="border: 3px solid gray; border-radius: 5px"
          class="height-100%">
          <div class="p-20">
            <kakao-load-view />
          </div>
          <div>
            <house-detail />
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import HouseSearchBar from "@/components/house/HouseSearchBar.vue";
import HouseDetail from "@/components/house/HouseDetail.vue";
import TheKakaoMap from "@/components/TheKakaoMap.vue";
import KakaoLoadView from "@/components/KakaoLoadView.vue";

import { mapState } from "vuex";

const houseStore = "houseStore";

export default {
  name: "AppHouse",
  components: {
    HouseSearchBar,
    KakaoLoadView,
    HouseDetail,
    TheKakaoMap,
  },
  computed: {
    ...mapState(houseStore, ["houses", "house"]),
  },
};
</script>
<style scoped>
.underline-orange {
  display: inline-block;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 70%,
    rgba(231, 149, 27, 0.3) 30%
  );
}

.custom-container {
  width: 70%;
}
</style>
