<template>
<div class="app">
  <tables :class="{shift: screenSm === 'summary'}"/>
  <orders-summary :class="{shift: screenSm === 'summary'}"/>
</div>
</template>

<script>
import { mapState } from 'vuex'
import Tables from '@/components/Tables.vue'
import OrdersSummary from '@/components/Summary.vue'
import FetchDataMixin from '@/mixins/FetchDataMixin'

export default {
  name: 'App',
  components: {
    Tables,
    OrdersSummary
  },
  mixins: [ FetchDataMixin ],
  computed: {
    ...mapState(['screenSm'])
  }
}
</script>

<style lang="scss">

.app {
  @include cool-background;
  color: $color__text-default;
  position: relative;
  height: 100vh;
  overflow-x: hidden;
}

.tables {
  position: absolute;
  transition: transform $time__page-transition;
}

.summary {
  position: absolute;
  left: 100vw;
  transition: transform ease $time__page-transition;
}

.shift {
  transform: translateX(-100vw);
}
</style>
