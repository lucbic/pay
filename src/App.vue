<template>
<div class="app">
  <navigation-bar />
  <content />
</div>
</template>

<script>
import FetchDataMixin from '@/mixins/FetchDataMixin'
export default {
  name: 'app',
  components: {
    NavigationBar, Content
  }
  mixins: [ FetchDataMixin ]
}
</script>

<style lang="scss" scoped>
.app {
  display: flex;
  align-items: stretch;
}
</style>
