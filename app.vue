<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <IToastContainer />
  </div>
</template>

<style lang="scss">
html {
  scroll-behavior: smooth;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.08s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
