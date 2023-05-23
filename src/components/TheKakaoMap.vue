<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
const houseStore = "houseStore";

export default {
  name: "KakaoMap",
  components: {},
  data() {
    return {
      map: null,
      positions: [],
      markers: [],
    };
  },
  props: {
    chargers: [],
    houses: [],
  },
  watch: {
    houses() {
      this.positions = [];

      this.houses.forEach((house) => {
        let obj = {};
        obj.title = house["아파트"];
        obj.address =
          house["중개사소재지"] + " " + house["법정동"] + " " + house["지번"];
        this.positions.push(obj);
      });

      this.loadMaker();
    },
  },
  created() {
    // console.log(houses);
  },
  mounted() {
    // api 스크립트 소스 불러오기 및 지도 출력
    if (window.kakao && window.kakao.maps) {
      this.loadMap();
    } else {
      this.loadScript();
    }
  },
  methods: {
    ...mapActions(houseStore, ["getHouseList"]),
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
    loadMap() {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };

      this.map = new window.kakao.maps.Map(container, options);
    },
    /* eslint-disable */
    loadMaker() {
      this.deleteMarker();

      var geocoder = new kakao.maps.services.Geocoder();
      this.markers = [];
      let completedCount = 0;

      const handleGeocodeComplete = () => {
        completedCount++;
        if (completedCount === this.positions.length) {
          this.setBounds();
        }
      };

      this.positions.forEach((position, index) => {
        geocoder.addressSearch(position.address, (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            let latlng = new window.kakao.maps.LatLng(result[0].y, result[0].x);
            position.latlng = latlng;
            createMarker();
          } else {
            position.latlng = null;
            handleGeocodeComplete();
          }
        });

        const createMarker = () => {
          const marker = new kakao.maps.Marker({
            map: this.map,
            position: position.latlng,
            title: position.title,
            clickable: true,
          });
          this.markers.push(marker);

          var iwContent = '<div style="padding:5px;">Hello World!</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
            iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다
          // 인포윈도우를 생성합니다
          var infowindow = new kakao.maps.InfoWindow({
            content: iwContent,
            removable: iwRemoveable,
          });

          // 마커에 클릭이벤트를 등록합니다
          window.kakao.maps.event.addListener(marker, "click", function () {
            console.log("click!");
            // 마커 위에 인포윈도우를 표시합니다
            infowindow.open(this.map, marker);
          });
          handleGeocodeComplete();
        };
      });
    },
    // 4. 지도를 이동시켜주기
    setBounds() {
      this.positions = this.positions.filter(
        (position) => position.latlng != null
      );
      const bounds = this.positions.reduce(
        (bounds, position) => bounds.extend(position.latlng),
        new kakao.maps.LatLngBounds()
      );
      this.map.setBounds(bounds);
    },
    deleteMarker() {
      if (this.markers.length > 0) {
        this.markers.forEach((item) => {
          item.setMap(null);
        });
      }
    },
  },
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 700px;
}
</style>
