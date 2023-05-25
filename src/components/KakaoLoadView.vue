<template>
  <div>
    <div id="roadview" style="width: 100%; height: 300px"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
const houseStore = "houseStore";

export default {
  name: "KakaoLoadView",
  computed: {
    ...mapState(houseStore, ["position"]),
  },
  watch: {
    position: {
      handler() {
        this.loadView(this.position);
      },
      immediate: true, // Calls the handler immediately when the component is mounted
    },
  },
  mounted() {
    // api 스크립트 소스 불러오기 및 지도 출력
    this.loadScript();
  },
  methods: {
    // api 불러오기
    loadScript() {
      const script = document.createElement("script");
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?appkey=" +
        process.env.VUE_APP_KAKAO_MAP_API_KEY +
        "&libraries=services" +
        "&autoload=false";
      /* global kakao */
      script.onload = () => window.kakao.maps.load(this.loadMap);

      document.head.appendChild(script);
    },
    // 맵 출력하기

    loadView(position) {
      var roadviewContainer = document.getElementById("roadview");
      var roadview = new kakao.maps.Roadview(roadviewContainer);
      var roadviewClient = new kakao.maps.RoadviewClient();

      roadviewClient.getNearestPanoId(position, 50, function (panoId) {
        roadview.setPanoId(panoId, position);
      });
    },
  },
};
</script>
