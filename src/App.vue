<template>
<div class="app">
  <tables :class="{shift: shift}"/>
  <orders-summary :class="{shift: shift}"/>
</div>
</template>

<script>
import Tables from '@/components/Tables.vue'
import OrdersSummary from '@/components/Summary.vue'
import FetchDataMixin from '@/mixins/FetchDataMixin'
import { eventBus } from '@/main'

export default {
  name: 'App',
  components: {
    Tables,
    OrdersSummary
  },
  mixins: [ FetchDataMixin ],
  created () {
    eventBus.$on('selectTable', () => {
      this.shift = true
    })
  },
  data () {
    return {
      shift: false
    }
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
