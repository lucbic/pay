<template>
<div class="order" @click="setActiveOrder(order.id)"
  :class="{ 'order--active': active }" id="order-component">
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
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Order',
  props: [ 'order' ],
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['getActiveOrder']),

    active () {
      // return this.getActiveOrder === this.order.id
      return false
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
    ...mapActions(['setActiveOrder'])
  }
}
</script>

<style lang="scss" scoped>
.order {
  @include orders-grid;
  height: $size__bg-stripes;
  font-family: $ff__dosis;
  font-size: 14px;

  &__center {
    justify-self: center;
  }

  &--active {
    border: 1px solid blue;
    border-radius: 5px;
  }
}
</style>
