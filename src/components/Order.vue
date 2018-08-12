<template>
<div class="order" @click="activate" :class="{ 'order--paid': order.paid }"
  id="order-component">
  <div class="order__grid" :class="{ 'order__grid--client': client }">
    <span>
      {{ order.product }}
    </span>
    <span v-if="!client">
      {{ order.client }}
    </span>
    <span class="order__center">
      {{ order.amount }}
    </span>
    <span class="order__center">
      {{ localePrice }}
    </span>
    <div v-if="!newOrder" class="order__box">
      <simple-svg :width="'14px'" :filepath="'static/img/square-regular.svg'" />
      <simple-svg class="order__box--check" v-show="order.status"
        :width="'14px'" :filepath="'static/img/check-solid.svg'" />
    </div>
    <button v-else class="order__box" @click="$emit('deleteNewOrder', order)">
      <simple-svg :width="'12px'" :filepath="'static/img/trash-solid.svg'" />
    </button>
  </div>
  <hr class="order__underline" v-show="active" >
  <hr class="order__line-through" v-show="order.paid" >
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Order',
  props: ['order', 'new-order', 'client'],
  computed: {
    ...mapState(['activeOrder']),

    active () {
      if (this.newOrder) { return }
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
      if (this.newOrder || this.order.paid || this.order.status) { return }
      if (this.activeOrder === this.order.id) { return }
      this.setActiveOrder(this.order.id)
    }
  }
}
</script>

<style lang="scss" scoped>
%line {
  position: absolute;
  margin: 0 14px 0 8px;
  width: calc(100% - 22px);
  bottom: 0;
}

.order {
  position: relative;

  &__grid {
    @extend %orders-grid;
    height: ($size__bg-stripes);
    font-family: $ff__dosis;
    font-size: 13px;
    line-height: 13px;
    >span, { align-self: center; }

    &--client {
      grid-template-columns: 8fr 1fr 2fr 1fr;
    }
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
    padding: 0;
    border: none;
    background: none;

    &--check {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-30%, -60%);
    }
  }

  &__underline {
    @extend %line;
    border: 1px solid blue;
  }

  &__line-through {
    @extend %line;
    bottom: 50%;
    border: 0.5px solid $light-red;
  }

  &--active {
    border-bottom: 2px dashed $pumpkin;
  }

  &--paid {
    color: $light-red;
  }
}
</style>
