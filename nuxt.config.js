// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  head: {
    title: "CAMS",
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  css: ["captain-icons/dist/captain-icons.css"],
  components: true,
  modules: ["@inkline/plugin/nuxt", "@nuxt/devtools"],
  devtools: { enabled: true },
  inkline: {
    // Plugin options (optional)
    // colorMode: "system",
  },
  buildModules: [],
});
