<template>
  <div class="hero">
    <b-container>
      <article class="article">
        <b-row>
          <b-col md="10">
            <nuxt-content :document="articles" tag="article" />
          </b-col>
          <b-col md="2"> </b-col>
        </b-row>
      </article>
    </b-container>
  </div>
</template>

<style scoped>
.hero {
  min-height: calc(100vh - 100px);
  background-color: rgb(8, 10, 14);
  background-image: url("~assets/pattern-large-dots.svg");
  background-repeat: repeat;
  background-size: contain;
}
.article {
  color: rgb(255, 255, 255);
  margin-top: 50px;
}
</style>

<script>
export default {
  async asyncData({ $content, params }) {
    // console.log(params);
    const articles = await $content(params.slug).only(["title", "description", "body"]).fetch();
    console.log(articles);
    return {
      articles,
    };
  },
  layout: "header",
  data() {
    return {
      params: this.$route.params.slug,
    };
  },
};
</script>
