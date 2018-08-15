<template>
<div class="app" ref="app">
  <transition-group :name="transition" tag="div" class="app__content">
    <tables v-show="tablesConditions" key="1" />
    <orders-summary v-show="summaryConditions" key="2" />
    <make-order v-if="makeOrderConditions" :client="clientMakeOrder" key="3"/>
    <client-orders v-show="clientOrdersConditions" key="4"/>
  </transition-group>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Tables from '@/components/Tables.vue'
import OrdersSummary from '@/components/Summary'
import MakeOrder from '@/components/MakeOrder'
import ClientOrders from '@/components/ClientOrders'

export default {
  name: 'App',
  components: {
    Tables,
    OrdersSummary,
    MakeOrder,
    ClientOrders
  },
  computed: {
    ...mapState(['screenSm']),
    transition () {
      if (this.$mq !== 'sm') { return }

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
    },
    tablesConditions () {
      return this.$mq === 'sm' ? this.screenSm === 'tables' : true
    },
    summaryConditions () {
      return this.$mq === 'sm' ? this.screenSm === 'summary' : this.screenSm !== 'make-order'
    },
    makeOrderConditions () {
      return this.screenSm === 'make-order'
    },
    clientOrdersConditions () {
      return this.screenSm === 'client-orders'
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
  created () { this.fetchData() },
  methods: { ...mapActions(['fetchData']) },
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

/* ------ TRANSITIONS ------ */
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

/* ------ MEDIA-QUERIES  ------ */
@media all and (min-width: $breakpoint__sm) {
  .app { min-height: 100%; }

  .tables,
  .summary,
  .make-order {
    position: static;
  }

  .tables {
    min-height: 310px !important;
    max-height: 310px;
  }

  .summary,
  .make-order {
    min-height: 450px !important;
    max-height: 450px;
  }

  .app__content {
    margin: 0 auto;
    max-width: $breakpoint__lg;
    display: flex;
    flex-direction: column;
    min-height: 100%;
  }

  @media (min-height: 770px) {
    .app { min-height: fit-content; }

    .app__content { max-height: 100vh; }

    .summary,
    .make-order {
      flex: 1;
      max-height: 770px;
    }
  }
}
</style>
