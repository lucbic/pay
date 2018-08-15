<template>
<div class="orders" @click="desselect($event)">
  <div class="orders__division">Pedidos{{ clientName }}</div>

  <div class="label" :class="{ 'label--client': client }">
    <span>Pedido</span>
    <span v-show="!client">Cliente</span>
    <span class="label__center">Qtd.</span>
    <span class="label__center">R$</span>
    <span class="label__center">Ok</span>
  </div>

  <div class="orders__content" v-bar>
    <div class="orders__content-wrapper" >
      <transition-group name="orders" tag="div">
        <order v-for="(order, index) in orders" :client="client"
                :order="order" :key="`order-${index}`"/>
      </transition-group>
      <add-order v-if="showAddOrder" />
    </div>
  </div>

  <div v-if="$mq === 'sm' ? true : client" class="total" >
    <span>Total{{ client ? ' cliente:' : ':' }}</span>
    <span>{{ localeTotal }}</span>
  </div>

</div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import Order from '@/components/Order'
import AddOrder from '@/components/AddOrder'

export default {
  name: 'Orders',
  components: {
    Order,
    AddOrder
  },
  props: ['client'],
  computed: {
    ...mapState(['activeOrder', 'currentTableIndex', 'activeClient']),
    ...mapGetters([
      'getTotal',
      'activeClientTotal',
      'tableOrders',
      'clientOrders',
      'tableClients',
      'activeClientName'
    ]),

    orders () {
      if (this.client) {
        return this.clientOrders(this.currentTableIndex, this.activeClient)
      } else {
        return this.tableOrders
      }
    },
    showAddOrder () {
      if (this.tableClients === undefined) { return }
      return this.tableClients.length > 0
    },
    clientName () {
      return this.activeClientName ? `: ${this.activeClientName}` : ''
    },
    localeTotal () {
      if (this.client && !this.activeClientTotal) { return 'R$ 0,00' }
      let localeTotal = this.client ? this.activeClientTotal : this.getTotal

      return localeTotal.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).replace('R$', 'R$ ')
    }
  },
  methods: {
    ...mapActions(['setActiveOrder']),

    desselect (event) {
      if (event.target.closest('#order-component')) { return }
      if (this.activeOrder === -1) { return }
      this.setActiveOrder(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.orders {
  flex: 1;
  display: flex;
  flex-direction: column;

  &__division {
    margin: 0;
    padding: 5px 0;
    text-align: center;
    font-family: $ff__dosis;
    font-size: 16px;
    font-weight: bold;
    background: $darkest-grey;
    color: $white;
    text-transform: uppercase;
    max-height: 28px;
    min-height: 28px;
    display: none;
  }

  &__content { height: 100%; }

  &__content-wrapper { @extend %striped-background; }
}

.label {
  @extend %orders-grid;
  height: 40px;

  font-family: $ff__dosis;
  font-size: 14px;
  font-weight: bold;

  &__center {
    justify-self: center;
  }

  &--client {
    grid-template-columns: 8fr 1fr 2fr 1fr;
  }
}

.total {
  background: $avocado;
  min-height: 40px;
  font-family: $ff__dosis;
  font-size: 24px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
}

/* ------ TRANSITIONS  ------ */
.orders-enter-active {
  max-height: 30px;
  transition: all .2s, opacity .2s .2s;
}

.orders-leave-active {
  max-height: 30px;
  transition: all .2s .2s, opacity .2s;
}

.orders-enter, .orders-leave-to {
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
  margin-top: 0;
  margin-bottom: 0;
  opacity: 0;
}

/* ------ MEDIA-QUERIES  ------ */
@media all and (min-width: $breakpoint__sm) {
  .orders__division { display: block; }
}
</style>
