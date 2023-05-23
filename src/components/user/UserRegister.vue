<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert variant="secondary" show><h3>회원가입</h3></b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col cols="8">
        <b-card class="text-center mt-3" style="max-width: 40rem" align="left">
          <b-form class="text-left">
            <b-form-group label="아이디:" label-for="userid">
              <b-form-input
                id="userid"
                v-model="user.username"
                required
                placeholder="아이디 입력...."
                @keyup.enter="confirm"></b-form-input>
            </b-form-group>
            <b-form-group label="비밀번호:" label-for="userpwd">
              <b-form-input
                type="password"
                id="userpwd"
                v-model="user.password"
                required
                placeholder="비밀번호 입력...."
                @keyup.enter="confirm"></b-form-input>
            </b-form-group>
            <b-button
              type="button"
              variant="success"
              class="m-1"
              @click="regist"
              >회원가입</b-button
            >
          </b-form>
        </b-card>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions } from "vuex";
const memberStore = "memberStore";

export default {
  name: "UserRegister",
  data() {
    return {
      // isLoginError: false,
      user: {
        username: null,
        password: null,
      },
    };
  },
  methods: {
    ...mapActions(memberStore, ["userRegist"]),
    async regist() {
      console.log("before", this.user);
      await this.userRegist(this.user);
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style></style>
