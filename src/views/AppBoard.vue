<template>
  <b-container class="bv-example-row mt-3 text-center">
    <h3 class="underline-hotpink">
      <b-icon icon="journals"></b-icon> Board Service
    </h3>
    <router-view v-if="isLogin"></router-view>
    <div v-else>로그인이 필요합니다.</div>
  </b-container>
</template>
<script>
import { mapState } from "vuex";
const memberStore = "memberStore";

export default {
  name: "AppBoard",
  computed: {
    ...mapState(memberStore, ["isLogin"]),
  },
};
</script>
<style scoped>
.underline-hotpink {
  display: inline-block;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 70%,
    rgba(231, 27, 139, 0.3) 30%
  );
}
.custom-container {
  width: 80%;
}
</style>
