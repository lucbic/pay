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
  color: $white;

  // display
  display: flex;
  justify-content: center;
  align-items: center;

  // transitions
  transition: all $time__default-transition;

  // modifier
  &--open {
    background: $avocado;
    border-radius: 15px;
  }

  /* children */
  &__number {
    font-size: 24px;
    font-family: $ff__dosis;
    font-size: 32px;
    font-weight: 700;
  }

  cursor: pointer;
}

@media all and (min-width: $breakpoint__sm) {
  .table {
    transform: scale(0.7);
    opacity: 0.6;

    &--active {
      transform: scale(1);
      opacity: 1;
    }
  }
}
</style>
