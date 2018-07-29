<template>
  <nav>
    <h1 class="navigation__title">PAY</h1>

  </nav>
</template>

<script>
export default {
  name: 'NavigationBar',
  components: {
  }
}
</script>

<style lang="scss" scoped>

nav {
  min-height: $size__header;
  width: 100%;
  // position: fixed;
  // top: 0;
  background: $color__navbar;
  z-index: 10;
}
</style>
