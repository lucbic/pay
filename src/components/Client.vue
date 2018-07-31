<template>
<div class="client">
  <span>
    {{ client.name }}
  </span>
  <span>
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
  padding: 6px 10px;
  margin: 5px;
  color: $color__header-text;
  font-family: $ff__dosis;
  font-size: 20px;
  border-radius: 10px;
}
</style>
