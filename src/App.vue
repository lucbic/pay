<template>
<div class="app" ref="app">

  <transition-group v-if="$mq === 'sm'" :name="transition" tag="div" class="mobile">
    <tables v-show="tablesConditions" key="1" />
    <orders-summary v-show="summaryConditions" key="2" />
    <make-order v-if="makeOrderConditions" :client="clientMakeOrder" key="3"/>
    <client-orders v-show="clientOrdersConditions" key="4"/>
  </transition-group>

  <div v-if="$mq !== 'sm' && $mq !== 'max'" class="tablet">
    <div class="tablet__upper-row">
      <tables />
    </div>
    <div class="tablet__lower-row">
      <div class="column-flex-wrapper">
        <orders-summary v-show="this.screenSm !== 'make-order'" />
        <make-order v-show="this.screenSm === 'make-order'" :client="activeClient !== -1"/>
      </div>
    </div>
  </div>

  <div v-if="$mq === 'max'" class="desktop" key="5">
    <div class="desktop__upper-row">
      <div class="logo-flex-wrapper"><logo /></div>
      <tables />
    </div>
    <div class="desktop__lower-row">
      <div class="column-flex-wrapper">
        <orders-summary />
      </div>
      <div class="column-flex-wrapper">
        <make-order :client="activeClient !== -1"/>
      </div>
    </div>
  </div>

</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Tables from '@/components/Tables'
import OrdersSummary from '@/components/Summary'
import MakeOrder from '@/components/MakeOrder'
import ClientOrders from '@/components/ClientOrders'
import Logo from '@/components/Logo'

export default {
  name: 'App',
  components: {
    Tables,
    OrdersSummary,
    MakeOrder,
    ClientOrders,
    Logo
  },
  computed: {
    ...mapState(['screenSm', 'activeClient']),
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
    },
    tablesConditions () {
      return this.screenSm === 'tables'
    },
    summaryConditions () {
      return this.screenSm === 'summary'
    },
    makeOrderConditions () {
      return this.screenSm === 'make-order'
    },
    clientOrdersConditions () {
      return this.screenSm === 'client-orders'
    },
    clientMakeOrder () {
      return this.screenSmOrigin[0] === 'client-orders' && this.screenSmOrigin[1] === 'make-order'
    }
  },
  watch: {
    screenSm (val) {
      if (this.screenSmOrigin.length === 2) { this.screenSmOrigin.shift() }
      this.screenSmOrigin.push(val)
    }
  },
  mounted () {
    this.screenSmOrigin.push('')
    this.screenSmOrigin.push(this.screenSm)
  },
  created () { this.fetchData() },
  methods: { ...mapActions(['fetchData']) },
  data () {
    return {
      screenSmOrigin: []
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

.column-flex-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  max-height: 100%
}

.tablet,
.desktop {
  min-height: 100vh;
  max-height: 100vh;
  max-width: 1620px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  &__lower-row {
    flex: 1;
    display: flex;
    max-height: 700px;
  }

  &__upper-row {
    min-height: 310px;
    max-height: 310px;
    display: flex;
  }
}

.logo-flex-wrapper {
  min-height: 100%;
  flex-basis: 33%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  .make-order { position: static; }

  .tablet { max-width: $breakpoint__md }

  @media (max-height: 767px) {
    .tablet,
    .desktop {
      min-height: 0;
      max-height: 768px;

      &__lower-row {
        min-height: 455px;
      }
    }
  }
}
</style>
