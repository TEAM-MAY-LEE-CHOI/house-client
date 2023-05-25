<template>
  <b-list-group class="font1" v-if="house">
    <b-list-group-item> 아파트 이름 : {{ house.아파트 }} </b-list-group-item>
    <b-list-group-item> 일련번호 : {{ house.일련번호 }} </b-list-group-item>
    <b-list-group-item> 법정동 : {{ house.법정동 }} </b-list-group-item>
    <b-list-group-item> 층수 : {{ house.층 }}층 </b-list-group-item>
    <b-list-group-item>
      <b-alert class="mb-0" show
        >거래금액 :
        {{
          (parseInt(house.거래금액.replace(",", "")) * 10000) | price
        }}원</b-alert
      >
    </b-list-group-item>
    <!-- </b-list-group-item> -->
  </b-list-group>
</template>

<script>
import { mapState } from "vuex";

const houseStore = "houseStore";

export default {
  name: "HouseDetail",
  computed: {
    ...mapState(houseStore, ["house"]),
  },
  filters: {
    price(value) {
      if (!value) return value;
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
</script>
