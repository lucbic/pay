<template>
<div class="content">
  <tables />
</div>
</template>

<script>
import Tables from '@/components/Tables.vue'

export default {
  name: 'AppContent',
  components: {
    Tables
  }
}
</script>

<style lang="scss" scoped>

.content {
  background: $color__background;
  flex: 1;
}
</style>
