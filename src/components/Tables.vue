<template>
<div class="tables">
  <logo class="logo"/>
  <div class="well">
    <h1 class="well__title">Selecione a mesa</h1>
    <div class="wrapper">
      <div class="tables__grid">
        <single-table v-for="(table, index) in tables" :key="`table-${index}`"
          :index="index" :data="table"/>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Logo from '@/components/Logo'
import SingleTable from '@/components/Table'
import { mapGetters } from 'vuex'

export default {
  name: 'Tables',
  components: {
    Logo,
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
.tables {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.logo {
  margin: 0 auto;
  margin-top: 10px;;
}

.well__title {
  text-align: center;
  font-family: $ff__dosis;
  font-size: $fs__h1;
  margin: 0;
  margin-top: $size__well-margin;
}

.well {
  margin: $size__well-margin;
  margin-top: 10px;
  background: $color__well;
  box-shadow: 6px 6px 10px 0px rgba(0,0,0,0.23);
  border-radius: $br__default;
  flex: 1;

  display: flex;
  flex-direction: column;
}

.wrapper {
  flex: 1;
  overflow-y: hidden;
}

.tables__grid {
  max-width: $breakpoint__md;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: min-content;
  align-items: center;
  justify-items: center;
  grid-row-gap: $size__tables-gap;
  grid-column-gap: $size__tables-gap;
  padding: (2 * $size__tables-gap) $size__tables-gap;
}
</style>
