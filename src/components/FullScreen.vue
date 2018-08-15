<template>
<div class="fullscreen" @click="toggle" key="0">
  <simple-svg :filepath="fullScreenIcon" width="14px" />
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'FullScreen',
  computed: {
    ...mapState(['fullscreen']),
    fullScreenIcon () {
      let prefix
      prefix = this.fullscreen ? 'exit-' : ''
      return `static/img/${prefix}full-screen.svg`
    }
  },
  methods: {
    ...mapActions(['toggleFullScreen']),
    toggle () {
      this.toggleFullScreen()
      this.$fullscreen.toggle(this.$root.$refs.app)
    }
  }
}
</script>

<style lang="scss" scoped>
.fullscreen {
  z-index: 1;
  position: absolute;
  top: 15px;
  right: 15px;
  padding: 5px;
  border: none;
  color: $white;
  background: $dark-grey;
  border-radius: 5px;
  fill: currentColor;
  cursor: pointer;
  
  >div { height: 14px; }
}

@media all and (min-width: $breakpoint__sm) {
  .fullscreen { display: none; }
}
</style>
