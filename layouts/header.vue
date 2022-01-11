<template>
  <div style="background-color: rgb(8, 10, 14)">
    <b-navbar type="light" variant="transparent" class="container">
      <b-navbar-brand to="/"
        ><span class="align-baseline"><b-icon-slash-circle-fill class="logo"></b-icon-slash-circle-fill></span> <span class="logo-txt align-top"> Ankit Kumar</span></b-navbar-brand
      >

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <div>
          <b-dropdown id="dropdown-right" right class="m-md-2 btn-toggl" variant="transparent" no-caret>
            <template #button-content><b-icon-caret-down-fill class="btn-menu"> </b-icon-caret-down-fill></template>
            <b-dropdown-item
              ><a :href="socials.twitter"><b-icon-twitter></b-icon-twitter></a
            ></b-dropdown-item>
            <b-dropdown-item
              ><a :href="socials.linkedin"><b-icon-linkedin></b-icon-linkedin></a
            ></b-dropdown-item>
            <b-dropdown-item
              ><a :href="socials.github"><b-icon-github></b-icon-github></a
            ></b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item><b-icon-info-circle-fill></b-icon-info-circle-fill></b-dropdown-item>
            <b-dropdown-item><b-icon-text-paragraph></b-icon-text-paragraph></b-dropdown-item>
          </b-dropdown>
        </div>
      </b-navbar-nav>
    </b-navbar>
    <Nuxt />
  </div>
</template>

<style scoped>
@media screen and (max-width: 800px) {
  .nav-link {
    margin-left: 0px !important;
  }
}
.logo {
  color: #00d395;
  font-size: 28px;
}
.logo-txt {
  font-weight: 700;
  font-size: 20px;
  color: rgb(255, 255, 255);
  font-family: "Open sans";
}
.navbar {
  height: 100px;
}
.navbar-toggler {
  border: none !important;
  color: rgb(0, 18, 44);
}
.nav-link {
  margin-left: 8px;
}
.nav-link:hover {
  color: rgb(0, 18, 44) !important;
}
.full-nav {
  width: 100%;
  height: 1px;
  background-color: rgb(204, 204, 204);
  box-shadow: 0px 1px 5px 0px rgb(204, 204, 204);
}
.btn-menu {
  color: #00d395 !important;
}
a {
  color: inherit;
}
a:hover {
  color: #00d395;
  text-decoration: none;
}
</style>

<script lang="ts">
import { BIconTextParagraph, BIconInfoCircleFill, BIconGithub, BIconLinkedin, BIconCaretDownFill, BIconSlashCircleFill, BIconTwitter, BIconInstagram, BIconLightningFill, BIconStopCircleFill, BIconSlashSquareFill, BIconFileFontFill, BIconQuestionSquareFill } from "bootstrap-vue";
export default {
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

<style lang="scss">
$dropdown-min-width: 1rem;
$dropdown-item-padding-y: 0.5rem;
$dropdown-item-padding-x: 0.7rem;

@import "../node_modules/bootstrap/scss/bootstrap.scss";
</style>
