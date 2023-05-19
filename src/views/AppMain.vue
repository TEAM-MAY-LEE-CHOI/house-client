<template>
  <b-container class="bv-example-row mt-3 text-center">
    <h3 class="underline-steelblue"><b-icon icon="house"></b-icon> 홈</h3>
    <b-row>
      <b-col></b-col>
      <b-col cols="10">
        <b-jumbotron
          bg-variant="muted"
          text-variant="dark"
          border-variant="dark">
          <template #header>부동산 프로젝트</template>

          <template #lead>
            Team : LeeAndChoi<br />
            부동산 프로젝트<br />
            <br />
            <br />
          </template>

          <hr class="my-4" />

          <a href>부동산 뉴스룸</a>
          <br />
          <br />
          <a href>오늘의 거래</a>
          <br />
          <br />
          <a href>주택 대출 안내</a>
        </b-jumbotron>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "AppMain",
  props: {
    msg: String,
  },
};
</script>

<style scoped>
.underline-steelblue {
  display: inline-block;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 70%,
    rgba(72, 190, 233, 0.3) 30%
  );
}
</style>
