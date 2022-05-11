<template>
  <div class="hero">
    <div class="container">
      <div class="right-manager">
        <div class="row">
          <div class="col-md-12">
            <div class="main-height-manager"></div>
            <div class="title">
              <div class="organizer">Writings.</div>
              <div class="organizer-sub">My (un)organized thoughts.</div>
            </div>
            <div class="sub-height-manager"></div>
            <div v-for="article in articles" :key="article.slug">
              <div class="blog-container">
                <div class="blog-title">{{ article.title }}</div>
                <div class="blog-description">{{ article.description }}</div>
                <div class="read-more">
                  <NuxtLink :to="`${baseURL}/${article.slug}`"> Read more →</NuxtLink>
                  <span class="blog-date float-right">{{ new Date(article.createdAt).toDateString() }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media screen and (max-width: 768px) {
  .blog-description {
    font-size: 0.8rem !important;
  }
  .blog-date {
    font-size: 0.8rem !important;
  }
  .blog-title {
    font-size: 1.2rem !important;
  }
  .read-more {
    font-size: 0.9rem !important;
  }
}

body {
  background-color: rgb(5, 5, 5);
}

.hero {
  min-height: calc(100vh - 100px);
  background-color: rgb(5, 5, 5);
  /* background-image: url("~assets/pattern-large-dots.svg"); */
  background-repeat: repeat;
  background-size: contain;
}
.title {
  padding-bottom: 20px;
  border-bottom: 1px dashed rgb(39, 39, 39);
}

.right-manager {
  margin-left: 5px;
}
.blog-container {
  /* padding-right: 50px; */
  margin-top: 10px;
  margin-bottom: 10px;
  border-bottom: solid 1px rgb(32, 32, 32);
}
.main-height-manager {
  height: 30px;
}
.sub-height-manager {
  height: 50px;
}
.organizer {
  font-weight: 600;
  color: #fff;
  font-size: 1.4rem;
}
.organizer-sub {
  font-weight: 400;
  color: rgb(218, 218, 218);
  font-size: 1rem;
}
.vr {
  height: 100vh;
  width: 1px;
  background-color: #fff;
}
.blog-title {
  font-weight: 500;
  color: rgb(245, 245, 245);
  font-size: 1.2rem;
}
.blog-date {
  font-size: 0.8rem;
  margin-top: 0px;
  margin-bottom: 5px;
  color: rgb(202, 202, 202);
  font-weight: 200;
}
.blog-description {
  font-size: 0.95rem;
  margin-top: 0px;
  margin-bottom: 5px;
  color: rgb(216, 216, 216);
  font-weight: 300;
}
.read-more {
  font-size: 0.9rem;
  margin-top: 5px;
  color: rgb(255, 255, 255);
  margin-bottom: 10px;
  color: #00d395;
  font-weight: 400;
}
.author-name {
  font-weight: 500;
}
a {
  color: inherit;
}
a:hover {
  color: #00d395;
  text-decoration: none;
}
</style>


<script>
export default {
  async asyncData({ $content }) {
    console.log(process.env.NODE_ENV);
    const articles = await $content("/").only(["title", "description", "img", "slug", "author", "createdAt"]).sortBy("createdAt", "desc").fetch();
    return {
      articles,
    };
  },
  layout: "header",
  data: () => {
    return {
      baseURL: process.env.NODE_ENV === "development" ? "/blogs" : "",
    };
  },
};
</script>

