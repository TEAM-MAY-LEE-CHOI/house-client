<template>
  <b-container
    fluid
    style="width: 80%; height: 800px"
    class="font1 bv-example-row mt-3 text-center">
    <h3 class="underline-steelblue mb-3"><b-icon icon="house"></b-icon>메인</h3>
    <b-row>
      <b-col>
        <b-row>
          <b-jumbotron
            class="p-3"
            bg-variant="muted"
            text-variant="dark"
            border-variant="dark">
            <div class="mb-2">
              <router-link
                :to="{ name: 'house' }"
                class="link"
                style="color: black">
                <b-icon icon="house-fill" font-scale="2"></b-icon>
                아파트정보
              </router-link>
            </div>
            <b-img
              style="border: 5px solid lightgray"
              thumbnail
              fluid
              :src="require('@/assets/apt_search.png')"
              id="logo"
              class="d-inline-block align-top"
              alt="logo"></b-img>
          </b-jumbotron>
        </b-row>
        <b-row class="mt-0">
          <b-jumbotron
            class="p-3"
            bg-variant="muted"
            text-variant="dark"
            border-variant="dark">
            <div class="mb-2">
              <router-link
                style="color: black"
                :to="{ name: 'board' }"
                class="m-3 link">
                <b-icon icon="journal" font-scale="2"></b-icon>
                Q&A게시판
              </router-link>
            </div>
            <b-img
              style="border: 5px solid lightgray"
              thumbnail
              fluid
              :src="require('@/assets/qna.png')"
              id="logo"
              class="d-inline-block align-top"
              alt="logo"></b-img>
          </b-jumbotron>
        </b-row>
      </b-col>
      <b-col>
        <b-jumbotron
          class="p-3"
          bg-variant="muted"
          text-variant="dark"
          border-variant="dark">
          <div class="mb-2">
            <router-link
              style="color: black"
              :to="{ name: 'news' }"
              class="link">
              <b-icon icon="newspaper" font-scale="2"></b-icon>
              뉴스 검색
            </router-link>
          </div>
          <b-img
            style="border: 5px solid lightgray"
            thumbnail
            fluid
            :src="require('@/assets/news.png')"
            id="logo"
            class="d-inline-block align-top"
            alt="logo"></b-img>
        </b-jumbotron>
      </b-col>
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
