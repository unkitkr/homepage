<template>
  <div class="hero">
    <b-container>
      <article class="article">
        <b-row>
          <b-col md="2"> </b-col>
          <b-col md="8">
            <div class="article-date">{{ moment(articles.updatedAt).format("MMMM Do YYYY") }}</div>
            <h1 class="article-title">{{ articles.title }}</h1>
            <h6 class="article-description">{{ articles.description }}</h6>
            <nuxt-content :document="articles" tag="article" />
          </b-col>
          <b-col md="2"> </b-col>
        </b-row>
      </article>
    </b-container>
  </div>
</template>

<style scoped>
body {
  background-color: rgb(5, 5, 5);
}
html {
  overflow: scroll;
  overflow-x: hidden;
}
.hero {
  min-height: calc(100vh - 150px);
  background-color: rgb(5, 5, 5);
  background-repeat: repeat;
  background-size: contain;
}
.article {
  color: rgb(194, 194, 194);
  margin-top: 50px;
  font-size: 18px;
  font-weight: 400;
  padding-bottom: 50px;
}
a {
  color: rgb(255, 255, 255) !important;
  text-decoration: underline;
}
.article-date {
  font-size: 0.9rem;
  margin-bottom: 5px;
  text-align: center;
}
.article-title {
  text-align: center;
  color: rgb(255, 255, 255);

  font-weight: 700;
}
.article-description {
  color: rgb(194, 194, 194);
  text-align: center;
  margin-bottom: 40px;
}
li {
  margin-bottom: 4px;
}
b,
strong {
  color: rgb(255, 255, 255);
}
blockquote {
  border-left: 2px solid rgb(255, 255, 255);
  color: rgb(255, 255, 255) !important;
  font-family: "Courier New", Courier, monospace;
  padding-left: 1.1rem;
}
</style>

<script>
import moment from "moment";
export default {
  async asyncData({ $content, params }) {
    const articles = await $content(params.slug).only(["title", "description", "body", "createdAt", "updatedAt"]).fetch();
    return {
      articles,
    };
  },
  layout: "header",
  computed: {
    moment() {
      return moment;
    },
  },
  data() {
    return {
      params: this.$route.params.slug,
    };
  },
};
</script>
