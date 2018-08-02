<template>
<div class="table" :class="{ 'table--open': data.open }" @click="selectTable(index)">
  <span class="table__number">{{ number }}</span>
</div>
</template>

<script>
import { mapActions } from 'vuex'

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

  /* children */
  &__number {
    // font
    font-size: 24px;
    font-family: $ff__dosis;
    font-size: 32px;
    font-weight: 700;
    color: white;
  }
}
</style>
