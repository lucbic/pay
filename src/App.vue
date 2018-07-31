<template>
<div class="app">
  <tables :class="{shift: shift}"/>
  <clients :class="{shift: shift}"/>
</div>
</template>

<script>
import Tables from '@/components/Tables.vue'
import Clients from '@/components/Clients.vue'
import FetchDataMixin from '@/mixins/FetchDataMixin'
import { eventBus } from '@/main'

export default {
  name: 'App',
  components: {
    Tables,
    Clients
  },
  mixins: [ FetchDataMixin ]
}
</script>

<style lang="scss">

.app {
  @include cool-background;
  color: $color__text-default;
  position: relative;
  height: 100vh;
}

.tables {
  position: absolute;
  transition: transform $time__page-transition;
}

.clients {
  position: absolute;
  left: 100vw;
  transition: transform ease $time__page-transition;
}

.shift {
  transform: translateX(-100vw);
}
</style>
