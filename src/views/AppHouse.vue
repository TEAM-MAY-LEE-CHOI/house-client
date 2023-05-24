<template>
  <b-container fluid class="custom-container bv-example-row mt-3 text-center">
    <h3 class="underline-orange">
      <b-icon icon="house-fill"></b-icon> House Service
    </h3>
    <b-row>
      <b-col>
        <house-search-bar></house-search-bar>
      </b-col>
    </b-row>
    <!-- 카카오맵 -->
    <b-row class="mt-3">
      <b-col cols="3" align="left">
        <kakao-load-view />
        <house-detail />
      </b-col>
      <b-col cols="9">
        <the-kakao-map :houses="houses"></the-kakao-map>
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
    ...mapState(houseStore, ["houses"]),
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
