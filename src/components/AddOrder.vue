<template>
<div class="add-order" @click="add" id="order-component">
  <simple-svg :filepath="'static/img/plus-circle-solid.svg'" :width="'14px'" />
  <span>Adicionar Pedido</span>
</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'AddOrder',
  methods: {
    ...mapActions(['setScreenSm']),
    add () {
      this.setScreenSm('make-order')
    }
  }
}
</script>

<style lang="scss" scoped>
.add-order {
  height: ($size__bg-stripes - 4px);
  background: $pumpkin;
  font-family: $ff__dosis;
  font-size: 16px;
  color: $white;
  font-size: 18px;
  font-weight: bold;
  border-radius: 8px;
  margin: 2px 14px 2px 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  cursor: pointer;

  >span {
    margin-left: 8px;
  }
}

@media all and (min-width: $breakpoint__xl) {
  .add-order { display: none; }
}
</style>
