<template>
<div class="table" :class="{ 'table--open': table.open, 'table--active': active }"
  @click="selectTable(index)" id="table-component">
  <span class="table__number">{{ number }}</span>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Table',
  props: [
    'index',
    'table'
  ],
  computed: {
    ...mapState(['currentTableIndex']),

    number () { return this.index + 1 },
    active () { return this.currentTableIndex === this.index }
  },
  methods: {
    ...mapActions(['setCurrentTableIndex', 'setScreenSm']),

    selectTable (index) {
      this.setScreenSm('summary')
      this.setCurrentTableIndex(index)
    }
  }
}
</script>

<style lang="scss" scoped>
.table {
  // shape
  background: $light-grey;
  width: $size__table;
  height: $size__table;
  border-radius: ($size__table / 2);

  // display
  display: flex;
  justify-content: center;
  align-items: center;

  // transitions
  transition:
    border-radius ease-in-out $time__default-transition,
    background ease-in-out $time__default-transition;

  // modifier
  &--open {
    background: $avocado;
    border-radius: 15px;
  }

  &--active {
    border: 4px solid $turquoise;
  }

  /* children */
  &__number {
    // font
    font-size: 24px;
    font-family: $ff__dosis;
    font-size: 32px;
    font-weight: 700;
    color: white;
  }

  cursor: pointer;
}
</style>
