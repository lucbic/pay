<template>
<div class="app">
  <tables :style="shiftScreen" />
  <orders-summary :style="shiftScreen" />
  <make-order :style="shiftScreen" />
</div>
</template>

<script>
import { mapState } from 'vuex'
import Tables from '@/components/Tables.vue'
import OrdersSummary from '@/components/Summary'
import MakeOrder from '@/components/MakeOrder'
import FetchDataMixin from '@/mixins/FetchDataMixin'

export default {
  name: 'App',
  components: {
    Tables,
    OrdersSummary,
    MakeOrder
  },
  mixins: [ FetchDataMixin ],
  computed: {
    ...mapState(['screenSm']),

    shiftScreen () {
      let shift

      switch (this.screenSm) {
        case 'tables':
          shift = 0
          break
        case 'summary':
          shift = 1
          break
        case 'make-order':
          shift = 2
          break
        default:
          shift = 0
          break
      }

      return { transform: `translateX(-${100 * shift}vw)` }
    }
  }
}
</script>

<style lang="scss">

.app {
  @extend %cool-background;
  color: $darkest-grey;
  position: relative;
  height: 100vh;
  overflow-x: hidden;
}

.tables,
.summary,
.make-order  {
  position: absolute;
  transition: transform $time__page-transition;
}

.summary { left: 100vw; }

.make-order { left: 200vw; }
</style>
