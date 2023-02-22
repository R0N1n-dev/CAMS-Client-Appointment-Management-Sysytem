<template>
  <i-layout>
    <i-nav style="" class="_position:sticky-top _border-bottom">
      <i-nav-item to="/">Home</i-nav-item>
      <i-nav-item to="/clients">Clients</i-nav-item>
      <i-nav-item to="/new_client">Add client</i-nav-item>
      <i-tooltip placement="right">
        <i-button class="_margin-left:3" circle @click="setColorMode">
          <i
            :class="
              colorMode === 'light' ? 'cap-icon ci-moon' : 'cap-icon ci-sun'
            "
          ></i>
        </i-button>
        <template #body>{{
          colorMode === "light" ? "Dark Mode" : "Light Mode"
        }}</template>
      </i-tooltip>
    </i-nav>

    <i-layout>
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

<style lang="scss" scoped>
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
