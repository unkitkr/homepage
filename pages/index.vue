<template>
  <div class="margin">
    <section class="hero">
      <b-container>
        <b-row>
          <b-col>
            <div class="intro-text">Hi.</div>
            <div class="content-text">
              <p>I am Ankit, a computer science graduate with a keen interest on product and design.</p>
              <p>Currently I'm working at <a href="https://www.swapcard.com" style="color: #00d395">Swapcard</a> as a Backend Engineer in the Customer Integration Squad.</p>
              <p>Previously I've worked at <a href="https://www.surveysparrow.com" style="color: #00d395">Surveysparrow</a> as a Product Engineer Intern in their Web performance Engineering team.</p>
            </div>
            <div class="content-sub-text">
              <p>This is a work in progress, please consider visiting after next weekend, probably I'll have blogs and a bit more about me 😄</p>
            </div>
            <div class="content-text-links" style="margin-top: 2rem">
              <p>
                <a :href="socials.twitter"><b-icon-twitter></b-icon-twitter> twitter</a> &nbsp;&nbsp; <a :href="socials.linkedin"><b-icon-linkedin></b-icon-linkedin> linkedin</a> &nbsp;&nbsp; <a :href="socials.github"><b-icon-github></b-icon-github> github</a> &nbsp;&nbsp; <b-icon-text-paragraph></b-icon-text-paragraph> blogs
              </p>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>
  </div>
</template>

<script lang="ts">
import { BIconTextParagraph, BIconInfoCircleFill, BIconGithub, BIconLinkedin, BIconCaretDownFill, BIconSlashCircleFill, BIconTwitter, BIconInstagram, BIconLightningFill, BIconStopCircleFill, BIconSlashSquareFill, BIconFileFontFill, BIconQuestionSquareFill } from "bootstrap-vue";
export default {
  layout: "header",
  components: {
    BIconSlashCircleFill,
    BIconTwitter,
    BIconInstagram,
    BIconLightningFill,
    BIconStopCircleFill,
    BIconSlashSquareFill,
    BIconFileFontFill,
    BIconQuestionSquareFill,
    BIconCaretDownFill,
    BIconLinkedin,
    BIconGithub,
    BIconInfoCircleFill,
    BIconTextParagraph,
  },
  data() {
    return {
      socials: {
        twitter: "https://www.twitter.com/unkitkr",
        linkedin: "https://www.linkedin.com/in/unkitkr",
        github: "https://www.github.com/unkitkr",
      },
    };
  },
};
</script>
<style scoped>
@media screen and (max-width: 768px) {
  .intro-text {
    font-size: 3rem !important;
  }
  .content-text {
    font-size: 1rem !important;
  }
  .content-sub-text {
    font-size: 0.8rem !important;
  }
}
@media screen and (max-width: 640) {
  .intro-text {
    font-size: 3rem !important;
  }
  .content-text {
    font-size: 1rem !important;
  }
  .content-sub-text {
    font-size: 0.8rem !important;
  }
}
@media screen and (max-width: 340px) {
  .intro-text {
    font-size: 3rem !important;
  }
  .content-text {
    font-size: 1rem !important;
  }
  .content-sub-text {
    font-size: 0.8rem !important;
  }
}

.hero {
  min-height: calc(100vh - 100px);
  background-color: rgb(8, 10, 14);
  background-image: url("~assets/pattern-large-dots.svg");
  background-repeat: repeat;
  background-size: contain;
}
.intro-text {
  font-size: 4rem;
  margin-top: 8rem;
  color: rgb(255, 255, 255);
  font-weight: 700;
  font-family: "Open sans";
  margin-left: 5px;
}

.content-text {
  margin-top: 1rem;
  color: rgb(255, 255, 255);
  font-size: 1.5rem;
  font-weight: 400;
  font-family: "Open sans";
  margin-left: 5px;
}
.content-text-links {
  margin-top: 2rem;
  color: rgb(255, 255, 255);
  font-size: 1rem;
  font-weight: 400;
  font-family: "Open sans";
  margin-left: 5px;
}
.content-sub-text {
  margin-top: 2rem;
  color: rgb(255, 255, 255);
  font-size: 1rem;
  font-weight: 400;
  font-family: "Open sans";
  margin-left: 5px;
}
a {
  color: inherit;
}
a:hover {
  color: #00d395;
  text-decoration: none;
}
</style>

