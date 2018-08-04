<template>
<div class="order" @click="activate" id="order-component">
  <div class="order__grid">
    <span>
      {{ order.product }}
    </span>
    <span>
      {{ order.client }}
    </span>
    <span class="order__center">
      {{ order.amount }}
    </span>
    <span>
      {{ localePrice }}
    </span>
    <div class="order__box">
      <simple-svg :width="'14px'" :filepath="'static/img/square-regular.svg'" />
      <simple-svg class="order__box--check" v-show="order.status"
        :width="'14px'" :filepath="'static/img/check-solid.svg'" />
    </div>
  </div>
  <hr class="order__underline" v-show="active" >
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Order',
  props: [ 'order' ],
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['activeOrder']),

    active () {
      return this.activeOrder === this.order.id
    },
    localePrice () {
      let localePrice = this.order.price
      return localePrice.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).replace('R$', 'R$ ')
    }
  },
  methods: {
    ...mapActions(['setActiveOrder']),

    activate () {
      if (this.activeOrder === this.order.id) { return }
      this.setActiveOrder(this.order.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.order {
  position: relative;

  &__grid {
    @extend %orders-grid;
    height: ($size__bg-stripes);
    font-family: $ff__dosis;
    font-size: 13px;
    line-height: 13px;
    >span, { align-self: center; }
  }

  &__center {
    justify-self: center;
  }

  &__box {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2px;
    position: relative;

    &--check {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-30%, -60%);
      color: blue;
    }
  }

  &__underline {
    position: absolute;
    margin: 0 14px 0 8px;
    width: calc(100% - 22px);
    bottom: 0;
    border: 1px solid $pumpkin;
  }

  &--active {
    border-bottom: 2px dashed $pumpkin;
  }
}
</style>
