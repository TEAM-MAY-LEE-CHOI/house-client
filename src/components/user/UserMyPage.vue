<template>
  <b-container class="font1 mt-4" v-if="userInfo">
    <b-row>
      <b-col>
        <b-alert variant="secondary" show><h3>내정보</h3></b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col cols="8">
        <b-jumbotron>
          <template #header>회원 관리</template>

          <template #lead> 내 정보 확인페이지입니다. </template>

          <hr class="my-4" />

          <b-container class="mt-4">
            <b-row>
              <b-col cols="3" align-self="end">아이디</b-col
              ><b-col cols="3" align-self="start">{{
                userInfo.username
              }}</b-col>
            </b-row>
            <b-row>
              <b-col cols="3" align-self="end">권한</b-col
              ><b-col cols="3" align-self="start">{{ userInfo.role }}</b-col>
            </b-row>
            <b-row>
              <b-col cols="3" align-self="end">가입일</b-col
              ><b-col cols="3" align-self="start">{{
                userInfo.joindate
              }}</b-col>
            </b-row>
          </b-container>
          <hr class="my-4" />

          <b-button v-b-modal.modify variant="primary" class="mr-1"
            >비밀번호변경하기</b-button
          >
          <b-modal @ok="userModify" id="modify" size="lg" title="비밀번호 수정">
            <input v-model="password" />
          </b-modal>
          <b-button variant="danger" href="#">회원탈퇴</b-button>
        </b-jumbotron>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
const memberStore = "memberStore";

export default {
  name: "UserMyPage",
  components: {},
  data() {
    return {
      password: "",
    };
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  methods: {
    ...mapActions(memberStore, ["userModify"]),
    modify() {
      console.log("user", this.userInfo);
      this.userModify({
        username: this.userInfo.username,
        password: this.password,
      });
    },
  },
};
</script>

<style></style>
