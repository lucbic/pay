<template>
<div class="table" :class="{ 'table--open': data.open }" @click="selectTable(index)">
  <span class="table__number">{{ number }}</span>
</div>
</template>

<script>
import { eventBus } from '@/main'

export default {
  name: 'Table',
  props: [
    'index',
    'data'
  ],
  computed: {
    number () { return this.index + 1 }
  },
  methods: {
    selectTable (index) {
      eventBus.$emit('selectTable', index)
    }
  }
}
</script>

<style lang="scss" scoped>
.table {
  // shape
  background: $color__table;
  width: $size__table;
  height: $size__table;
  border-radius: ($size__table / 2);

  // display
  display: flex;
  justify-content: center;
  align-items: center;

  // transitions
  transition:
    border-radius ease-in-out $time__table-transition,
    background ease-in-out $time__table-transition;

  // modifier
  &--open {
    background: $color__table--open;
    border-radius: 15px;
  }

  /* children */
  &__number {
    // font
    font-size: $fs__table;
    font-family: $ff__dosis;
    font-size: 32px;
    font-weight: 700;
    color: white;
  }
}
</style>
