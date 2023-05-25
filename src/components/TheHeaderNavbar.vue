<template>
  <div>
    <b-navbar toggleable="lg" style="background-color: lightblue">
      <b-navbar-brand href="#">
        <router-link :to="{ name: 'main' }">
          <b-img
            style="border: 5px solid lightgray"
            thumbnail
            fluid
            :src="require('@/assets/main_logo.png')"
            id="logo"
            class="d-inline-block align-top"
            alt="logo"></b-img>
        </router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#" class="font1">
            <router-link :to="{ name: 'main' }" class="m-3 link">
              <b-icon icon="house-door" font-scale="2"></b-icon>
              메인
            </router-link>
            <router-link :to="{ name: 'house' }" class="m-3 link">
              <b-icon icon="house-fill" font-scale="2"></b-icon>
              아파트정보
            </router-link>
            <router-link :to="{ name: 'news' }" class="m-3 link">
              <b-icon icon="newspaper" font-scale="2"></b-icon>
              뉴스 검색
            </router-link>
            <router-link :to="{ name: 'board' }" class="m-3 link">
              <b-icon icon="journal" font-scale="2"></b-icon>
              Q&A게시판
            </router-link>
          </b-nav-item>
        </b-navbar-nav>

        <!-- after login -->
        <!-- eslint-disable -->
        <b-navbar-nav class="font1 ml-auto" v-if="userInfo">
          <b-nav-item class="align-self-center">
            <b-avatar></b-avatar>
            <b-nav-text class="ml-3">
              {{ userInfo.username }}님 환영합니다.</b-nav-text
            >
          </b-nav-item>
          <b-nav-item class="align-self-center">
            <b-button style="padding-bottom: 0; all: unset" v-b-modal.modal-lg
              >내 정보 보기</b-button
            >
            <b-modal id="modal-lg" size="lg" title="회원 관리">
              <user-my-page />
            </b-modal>
          </b-nav-item>
          <b-nav-item
            class="align-self-center link"
            @click.prevent="onClickLogout"
            >로그아웃</b-nav-item
          >
        </b-navbar-nav>
        <!-- before login -->
        <b-navbar-nav class="ml-auto" v-else>
          <b-nav-item-dropdown right>
            <template #button-content>
              <b-icon icon="people" font-scale="2"></b-icon>
            </template>
            <b-dropdown-item href="#">
              <router-link :to="{ name: 'join' }" class="link">
                <b-icon icon="person-circle"></b-icon> 회원가입
              </router-link>
            </b-dropdown-item>
            <b-dropdown-item href="#">
              <router-link :to="{ name: 'login' }" class="link">
                <b-icon icon="key"></b-icon> 로그인
              </router-link>
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import UserMyPage from "./user/UserMyPage.vue";
const memberStore = "memberStore";

export default {
  name: "TheHeaderNavbar",
  components: {
    UserMyPage,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "userInfo"]),
    ...mapGetters(["checkUserInfo"]),
  },
  methods: {
    ...mapActions(memberStore, ["userLogout"]),
    // ...mapMutations(memberStore, ["SET_IS_LOGIN", "SET_USER_INFO"]),
    onClickLogout() {
      // this.SET_IS_LOGIN(false);
      // this.SET_USER_INFO(null);
      // sessionStorage.removeItem("access-token");
      // if (this.$route.path != "/") this.$router.push({ name: "main" });
      //vuex actions에서 userLogout 실행(Backend에 저장 된 리프레시 토큰 없애기
      //+ satate에 isLogin, userInfo 정보 변경)
      // this.$store.dispatch("userLogout", this.userInfo.userid);
      this.userLogout(this.userInfo.userid);
      sessionStorage.removeItem("access-token"); //저장된 토큰 없애기
      sessionStorage.removeItem("refresh-token"); //저장된 토큰 없애기
      if (this.$route.path != "/") this.$router.push({ name: "main" });
    },
  },
};
</script>

<style scoped>
#logo {
  width: 120px;
}
a {
  color: rgba(0, 0, 0, 0.5);
}
.link {
  text-decoration: none;
  color: black;
}
</style>
