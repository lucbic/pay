<template>
<div class="app" ref="app">
  <transition-group :name="transition">
    <tables v-show="screenSmOrigin[1] === 'tables'" key="1" />
    <orders-summary v-show="screenSmOrigin[1] === 'summary'" key="2" />
    <make-order v-if="screenSmOrigin[1] === 'make-order'" :client="clientMakeOrder" key="3"/>
    <client-orders v-show="screenSmOrigin[1] === 'client-orders'" key="4"/>
  </transition-group>
</div>
</template>

<script>
import { mapState } from 'vuex'
import Tables from '@/components/Tables.vue'
import OrdersSummary from '@/components/Summary'
import MakeOrder from '@/components/MakeOrder'
import ClientOrders from '@/components/ClientOrders'
import FetchDataMixin from '@/mixins/FetchDataMixin'

export default {
  name: 'App',
  components: {
    Tables,
    OrdersSummary,
    MakeOrder,
    ClientOrders
  },
  mixins: [ FetchDataMixin ],
  computed: {
    ...mapState(['screenSm']),
    transition () {
      const scr = this.screenSmOrigin
      if (scr[0] === 'tables' && scr[1] === 'summary') {
        return 'shift-left'
      } else if (scr[0] === 'summary' && scr[1] === 'tables') {
        return 'shift-right'
      } else if (scr[0] === 'summary' && scr[1] === 'make-order') {
        return 'shift-left'
      } else if (scr[0] === 'make-order' && scr[1] === 'summary') {
        return 'shift-right'
      } else if (scr[0] === 'summary' && scr[1] === 'client-orders') {
        return 'shift-left'
      } else if (scr[0] === 'client-orders' && scr[1] === 'summary') {
        return 'shift-right'
      } else if (scr[0] === 'client-orders' && scr[1] === 'make-order') {
        return 'shift-left'
      } else if (scr[0] === 'make-order' && scr[1] === 'client-orders') {
        return 'shift-right'
      } else if (scr[0] === 'client-orders' && scr[1] === 'tables') {
        return 'shift-right'
      }
    }
  },
  watch: {
    screenSm (val) {
      if (this.screenSmOrigin.length === 2) { this.screenSmOrigin.shift() }
      this.screenSmOrigin.push(val)
    },
    screenSmOrigin (self) {
      if (self[0] === 'client-orders' && self[1] === 'make-order') {
        this.clientMakeOrder = true
      } else {
        this.clientMakeOrder = false
      }
    }
  },
  mounted () {
    this.screenSmOrigin.push(this.screenSm)
    this.screenSmOrigin.push(this.screenSm)
  },
  data () {
    return {
      screenSmOrigin: [],
      clientMakeOrder: false
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
}

.tables,
.summary,
.make-order {
  position: absolute;
}

.shift-left-enter-active, .shift-left-leave-active {
  transform: translateX(0);
  transition: transform .4s;
}

.shift-left-enter  {
  transform: translateX(100vw);
}

.shift-left-leave-to {
  transform: translateX(-100vw);
}

.shift-right-enter-active, .shift-right-leave-active {
  transform: translateX(0);
  transition: transform .4s;
}

.shift-right-enter {
  transform: translateX(-100vw);
}

.shift-right-leave-to {
  transform: translateX(100vw);
}


</style>
