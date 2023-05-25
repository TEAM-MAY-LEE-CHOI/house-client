<template>
  <b-container fluid>
    <b-row class="font1 mb-2 pl-3 pr-3">
      <b-button
        style="background-color: darkorange"
        class="button1 mr-2"
        @click="setOverlayMapTypeId('traffic')">
        교통정보 보기
      </b-button>
      <b-button
        class="button1 mr-2"
        style="background-color: chocolate"
        @click="setOverlayMapTypeId('roadview')">
        로드뷰 도로정보 보기
      </b-button>
      <b-button
        style="background-color: brown"
        class="button1 mr-2"
        @click="setOverlayMapTypeId('terrain')">
        지형정보 보기
      </b-button>
      <b-button
        class="button1"
        style="background-color: saddlebrown"
        @click="setOverlayMapTypeId('use_district')">
        지적편집도 보기
      </b-button>
    </b-row>
    <b-row>
      <b-col>
        <div style="border: 3px solid gray; border-radius: 5px" id="map"></div>
      </b-col>
    </b-row>
  </b-container>
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
      currentTypeId: null,
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
    ...mapActions(houseStore, ["getHouseList", "detailHouse", "housePosition"]),
    // api 불러오기
    setOverlayMapTypeId(maptype) {
      console.log("지도 타입", maptype);
      var changeMaptype;

      // maptype에 따라 지도에 추가할 지도타입을 결정합니다
      if (maptype === "traffic") {
        // 교통정보 지도타입
        changeMaptype = kakao.maps.MapTypeId.TRAFFIC;
      } else if (maptype === "roadview") {
        // 로드뷰 도로정보 지도타입
        changeMaptype = kakao.maps.MapTypeId.ROADVIEW;
      } else if (maptype === "terrain") {
        // 지형정보 지도타입
        changeMaptype = kakao.maps.MapTypeId.TERRAIN;
      } else if (maptype === "use_district") {
        // 지적편집도 지도타입
        changeMaptype = kakao.maps.MapTypeId.USE_DISTRICT;
      }

      // 이미 등록된 지도 타입이 있으면 제거합니다
      if (this.currentTypeId) {
        this.map.removeOverlayMapTypeId(this.currentTypeId);
      }

      // maptype에 해당하는 지도타입을 지도에 추가합니다
      this.map.addOverlayMapTypeId(changeMaptype);

      // 지도에 추가된 타입정보를 갱신합니다
      this.currentTypeId = changeMaptype;
    },

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

      var geocoder = new window.kakao.maps.services.Geocoder();
      this.markers = [];
      let completedCount = 0;

      const handleGeocodeComplete = () => {
        completedCount++;
        if (
          completedCount === this.positions.length &&
          this.positions.length > 0
        ) {
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

          // 마커에 클릭이벤트를 등록합니다
          window.kakao.maps.event.addListener(marker, "click", function () {
            selectHouse(index);
          });
          handleGeocodeComplete();
        };

        const selectHouse = (index) => {
          this.map.panTo(position.latlng);
          this.detailHouse(this.houses[index]);
          this.housePosition(position.latlng);
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
