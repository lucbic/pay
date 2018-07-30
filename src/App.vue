<template>
<div class="app">
  <app-content />
</div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar'
import AppContent from '@/components/AppContent'
import FetchDataMixin from '@/mixins/FetchDataMixin'

export default {
  name: 'App',
  components: {
    NavigationBar,
    AppContent
  },
  mixins: [ FetchDataMixin ]
}
</script>

<style lang="scss">

.app {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 100vh;

  // default text color
  color: $color__text-default;
}
</style>
