export default {
  // Global page headers: https://go.nuxtjs.dev/config-head

  head: {
    title: "unkitkr",
    htmlAttrs: {
      lang: "en",
    },
    meta: [{ charset: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" }, { hid: "description", name: "description", content: "" }, { name: "format-detection", content: "telephone=no" }],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
    "@nuxtjs/google-fonts",
    "@nuxtjs/dotenv",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "bootstrap-vue/nuxt",
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/content
    "@nuxt/content",
  ],
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: "/",
  },
  target: "static",
  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {
    editor: "~/.nuxt/content/editor.vue",
    apiPrefix: "_content",
    dir: "content",
    fullTextSearchFields: ["title", "description", "slug", "text"],
    nestedProperties: [],
    liveEdit: true,
    useCache: false,
    markdown: {
      remarkPlugins: ["remark-squeeze-paragraphs", "remark-slug", "remark-autolink-headings", "remark-external-links", "remark-footnotes"],
      rehypePlugins: ["rehype-sort-attribute-values", "rehype-sort-attributes", "rehype-raw"],
      prism: {
        theme: "~assets/prisma-custom.css",
      },
    },
    yaml: {},
    csv: {},
    xml: {},
    extendParser: {},
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  googleFonts: {
    families: {
      Roboto: true,
      "Josefin+Sans": true,
      Lato: [100, 300],
      Raleway: [100, 300, 400, 500, 600, 700, 800],
      "Open+Sans": [100, 300, 400, 500, 600, 700, 800],
    },
  },
  server: {
    port: 3000, // default: 3000
  },
};
