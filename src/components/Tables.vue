<template>
<div class="tables">
  <full-screen />
  <small-logo class="tables__small-logo"/>
  <logo class="tables__logo"/>
  <div class="well" @click="deselect($event)">
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
import SmallLogo from '@/components/SmallLogo'
import SingleTable from '@/components/Table'
import { mapState, mapActions } from 'vuex'
import FullScreen from '@/components/FullScreen'

export default {
  name: 'Tables',
  components: {
    Logo,
    SmallLogo,
    SingleTable,
    FullScreen
  },
  computed: {
    ...mapState(['tables', 'currentTableIndex'])
  },
  methods: {
    ...mapActions(['setCurrentTableIndex']),

    deselect (event) {
      if (event.target.closest('#table-component')) { return }
      if (this.currentTableIndex === null) { return }
      this.setCurrentTableIndex(null)
    }
  }
}
</script>

<style lang="scss" scoped>
.tables {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  position: relative;

  &__logo {
    margin: 0 auto;
    margin-top: 10px;;
  }

  &__small-logo {
    position: absolute;
    top: 20px;
    right: 20px;
    display: none;
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
    text-transform: uppercase;
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

    &__small-logo {
      display: block;
    }

    &__grid {
      grid-template-columns: repeat(5, 1fr);
    }
  }
}

@media all and (min-width: $breakpoint__xl) {
  .tables__small-logo { display: none; }
}
</style>
