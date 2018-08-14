<template>
<div class="tables">
  <full-screen />
  <logo class="tables__logo"/>
  <div class="well">
    <h1 class="well__title">Selecione a mesa</h1>
    <hr>
    <div class="scroll" v-bar>
      <div class="scroll__content">
        <div class="tables__grid">
          <single-table v-for="(table, index) in tables" :key="`table-${index}`"
            :index="index" :table="table"/>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Logo from '@/components/Logo'
import SingleTable from '@/components/Table'
import { mapState } from 'vuex'
import FullScreen from '@/components/FullScreen'

export default {
  name: 'Tables',
  components: {
    Logo,
    SingleTable,
    FullScreen
  },
  computed: {
    ...mapState(['tables'])
  }
}
</script>

<style lang="scss" scoped>
.tables {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;

  &__logo {
    margin: 0 auto;
    margin-top: 10px;;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: min-content;
    align-items: center;
    justify-items: center;
    grid-row-gap: $size__tables-gap;
    grid-column-gap: $size__tables-gap;
    padding: 0 $size__tables-gap
  }
}

.well {
  margin: $size__well-margin;
  margin-top: 10px;
  background: $white;
  box-shadow: 6px 6px 10px 0px rgba(0,0,0,0.23);
  border-radius: 15px;
  flex: 1;

  display: flex;
  flex-direction: column;

  hr {
    width: 60%;
    align-self: center;
    margin: 20px 0;
    border: 0.5px solid $darkest-grey;
    padding-left: $size__tables-gap;
    padding-right: $size__tables-gap;
  }

  &__title {
    text-align: center;
    font-family: $ff__dosis;
    font-size: 22px;
    margin: 0;
    margin-top: $size__tables-gap;
  }
}

.scroll {
  flex: 1;
  margin: 0 ($size__tables-gap / 2);
  margin-bottom: $size__tables-gap;
}

/* ------ MEDIA-QUERIES  ------ */
@media all and (min-width: $breakpoint__sm) {
  .tables {
    height: 100%;
    width: 100%;

    &__logo {
      display: none;
    }

    &__grid {
      grid-template-columns: repeat(5, 1fr);
    }
  }
}
</style>
