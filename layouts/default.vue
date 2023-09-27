<template>
  <ILayout>
    <INav class="_position:top _border-bottom">
      <INavItem to="/">Home</INavItem>
      <INavItem to="/clients">Clients</INavItem>
      <INavItem to="/new_client">Add client</INavItem>
      <ITooltip placement="right">
        <IButton class="_margin-left:3" circle> L </IButton>
        <template #body>D</template>
      </ITooltip>
    </INav>

    <ILayout>
      <ILayoutContent>
        <slot />
      </ILayoutContent>

      <!--<i-layout-footer> Footer </i-layout-footer>-->
    </ILayout>
  </ILayout>
</template>

<script setup>
const showSidebar = ref(false);
/*const inkline = inject("inkline");
const colorMode = ref(inkline.options.colorMode);

// Set the initial color mode value to determine the icon to be displayed
if (colorMode.value === "system" && typeof window !== "undefined") {
  colorMode.value = window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

// Toggle between light and dark mode
const setColorMode = () => {
  const mode = colorMode.value === "light" ? "dark" : "light";

  inkline.options.colorMode = mode;
  colorMode.value = mode;
};*/
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}

a.router-link-exact-active {
  font-weight: 800;
}

button {
  --border-style: none;
}
</style>
