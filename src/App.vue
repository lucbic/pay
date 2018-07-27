<template>
<div class="app">
  <navigation-bar />
  <content />
</div>
</template>

<script>
export default {
  name: 'app',
  components: {
    NavigationBar, Content
  }
}
</script>

<style lang="scss" scoped>
.app {
  display: flex;
  align-items: stretch;
}
</style>
