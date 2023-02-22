<template>
  <i-layout>
    <i-nav style="" class="_background:light _position:sticky-top">
      <i-nav-item to="/">Home</i-nav-item>
      <i-nav-item to="/about">About</i-nav-item>
      <i-nav-item to="/clients">Clients</i-nav-item>
      <i-nav-item to="/new_client">Add client</i-nav-item>
    </i-nav>
    <!--<i-layout-aside class="_background:github">
      <div>
        <i-button block color="dark" class="_margin-y:0 _text-align: center">
          <nuxt-link to="/new_client">Add client</nuxt-link>
        </i-button>
        <i-button block color="dark" class="_margin-y:0 _text-align: center">
          <nuxt-link to="/clients">Clients</nuxt-link>
        </i-button>
        <i-button
          block
          color="dark"
          class="_margin-y:0 _border:0 _text-align: center"
        >
          <nuxt-link to="/">Home</nuxt-link>
        </i-button>
        <i-button
          block
          color="dark"
          class="_margin-y:0 _border-radius:0 _border:0 _text-align: center"
        >
          <nuxt-link to="/about">About</nuxt-link>
        </i-button>
      </div>
    </i-layout-aside>-->

    <i-layout>
      <!--<i-layout-header>
        <i-nav>
          <i-nav-item to="/">Home</i-nav-item>
          <i-nav-item to="/about">About</i-nav-item>
          <i-nav-item to="/clients">Clients</i-nav-item>
          <i-nav-item to="/new_client">Add client</i-nav-item>
        </i-nav>
      </i-layout-header>-->

      <i-layout-content>
        <slot />
      </i-layout-content>

      <!--<i-layout-footer> Footer </i-layout-footer>-->
    </i-layout>
  </i-layout>
</template>

<script setup>
const showSidebar = ref(false);
const inkline = inject("inkline");
const colorMode = ref(inkline.options.colorMode);

// Set the initial color mode value to determine the icon to be displayed
if (colorMode.value === "system" && typeof window !== "undefined") {
  colorMode.value = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

// Toggle between light and dark mode
const setColorMode = () => {
  const mode = colorMode.value === "dark" ? "light" : "dark";

  inkline.options.colorMode = mode;
  colorMode.value = mode;
};
</script>

<style style="scss" scoped>
a {
  text-decoration: none;
}
a.router-link-exact-active {
  font-weight: 800;
}

.layout-aside {
  height: var(--height);
  ----width: var(--width);
}

button {
  --border-style: none;
}
</style>
