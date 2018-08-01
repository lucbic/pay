<template>
<div class="client">
  <div>
    <simple-svg class="client__icon" :width="'14px'"
      :filepath="'static/img/user-solid.svg'" />
    <span class="client__name">
      {{ client.name }}
    </span>
  </div>
  <span class="client__total">
    {{ total }}
  </span>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Client',
  props: [ 'client' ],
  computed: {
    ...mapGetters(['getClientOrders', 'getCurrentTableIndex']),

    total () {
      const tableIndex = this.getCurrentTableIndex
      const orders = this.getClientOrders(tableIndex, this.client.id)
      let total = 0

      console.log(orders)
      orders.forEach(order => {
        total += (order.price * order.amount)
      })

      let localeTotal = total.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })

      return localeTotal.replace('R$', 'R$ ')
    }
  }
}
</script>

<style lang="scss" scoped>
.client {
  background: $color__dark-grey;
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 6px 10px;
  margin: 5px;
  color: $color__header-text;
  font-family: $ff__dosis;
  font-size: 20px;
  border-radius: 10px;

  &__icon,
  &__name,
  &__total {
    display: inline-block;
  }

  &__name {
    margin-left: 5px;
  }
}
</style>
