<template>
<div class="tables">
  <div class="wrapper">
    <single-table v-for="(table, index) in tables" :key="`table-${index}`"
      :index="index" :data="table"/>
  </div>
</div>
</template>

<script>
import SingleTable from '@/components/Table'
import { mapGetters } from 'vuex'

export default {
  name: 'Tables',
  components: {
    SingleTable
  },
  computed: {
    ...mapGetters(['tables'])
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.tables,
.wrapper {
  max-height: 100%;
  min-height: 100%;
}

.wrapper {
  margin: 0 auto;
  max-width: $breakpoint__md;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-items: center;
  grid-row-gap: $size__tables-gap;
  padding: $size__tables-gap $size__tables-gap;
  height: 100%;
}
</style>
