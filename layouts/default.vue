<template>
  <i-layout>
    <i-nav style="" class="_position:sticky-top _border-bottom">
      <i-nav-item to="/">Home</i-nav-item>
      <i-nav-item to="/clients">Clients</i-nav-item>
      <i-nav-item to="/new_client">Add client</i-nav-item>
    </i-nav>

    <i-layout>
      <i-layout-content>
        <slot />
      </i-layout-content>

      <!--<i-layout-footer> Footer </i-layout-footer>-->
    </i-layout>
  </i-layout>
</template>

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
