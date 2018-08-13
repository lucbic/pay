<template lang="html">
  <div v-show="active" class="wrapper">
    <div class="overlay" @click="reply(false)"/>
    <div class="checkout">
      <button class="checkout__exit" @click="reply(false)">
        <simple-svg :filepath="'static/img/times-solid.svg'" :width="'14px'" />
      </button>

      <h1 v-if="client" class="checkout__header">
        Fechar conta de<br />{{ activeClientName }}?
      </h1>
      <h1 v-else class="checkout__header">
        Fechar mesa {{ currentTableIndex + 1 }}?
      </h1>

      <span v-if="client" class="label">Consumo individual</span>
      <span v-else class="label">Consumo da mesa</span>
      <div class="orders" v-bar :style="{ height: ordersHeight }">
        <div class="orders__wrapper">
          <div class="item" v-for="(order, index) in orders"
            :key="`order${index}`">
            <span>{{ order.amount }} x {{ getProduct(order.product_id).name }}</span>
            <span class="price">{{ localeOrderTotal(order) }}</span>
          </div>
        </div>
      </div>

      <span class="label">Adicionais</span>

      <div class="tax item" @click="includeTax = !includeTax">
        <div class="tax__box">
          <simple-svg :width="'14px'" :filepath="'static/img/square-regular.svg'" />
          <simple-svg class="tax__box--check" v-show="includeTax"
            :width="'14px'" :filepath="'static/img/check-solid.svg'" />
        </div>
        <span class="tax__label">Taxa de serviço</span>
        <span class="price">{{ localeTax }}</span>
      </div>

      <div class="total item">
        <span>Total</span>
        <span class="price">{{ localeTotal }}</span>
      </div>

      <div class="checkout__buttons">
        <button class="btn orange" @click="reply(false)">
          Cancelar
        </button>
        <button class="btn green" @click="reply(true)">
          Confimar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'Checkout',
  props: ['client'],
  data () {
    return {
      active: false,
      includeTax: true
    }
  },
  computed: {
    ...mapState([
      'currentTableIndex',
      'activeClient'
    ]),
    ...mapGetters([
      'activeClientName',
      'clientOrders',
      'tableOrders',
      'getProduct'
    ]),
    orders () {
      if (this.client) {
        return this.clientOrders(this.currentTableIndex, this.activeClient)
      } else {
        return this.tableOrders.filter(x => !x.paid)
      }
    },
    localeTotal () {
      let total = this.total
      if (this.includeTax) { total += this.tax }
      return this.toLocale(total)
    },
    total () {
      if (this.orders === undefined || this.orders === null) { return 0 }
      let total = 0
      this.orders.forEach(order => {
        total += this.orderTotal(order)
      })
      return total
    },
    tax () {
      return this.total * 0.1
    },
    localeTax () {
      return this.toLocale(this.tax)
    },
    ordersHeight () {
      if (this.orders === undefined) { return }
      return (this.orders.length * 30 + 2) + 'px'
    }
  },
  methods: {
    ...mapActions(['checkoutActiveClient', 'closeCurrentTable']),
    reply (val) {
      if (val) { this.client ? this.checkoutActiveClient() : this.closeCurrentTable() }
      this.includeTax = true
      this.active = false
    },
    show () {
      this.active = true
    },
    orderTotal (order) {
      return order.amount * this.getProduct(order.product_id).price
    },
    localeOrderTotal (order) {
      return this.toLocale(this.orderTotal(order))
    },
    toLocale (price) {
      return price.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).replace('R$', 'R$ ')
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: 1;
}

.overlay {
  background: $black;
  opacity: 0.5;
  height: 100%;
  width: 100%;
}

.checkout {
  z-index: 2;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(100vw - 20px);
  background: $white;
  display: flex;
  flex-direction: column;
  color: $darkest-grey;
  border-radius: 15px;
  padding: 20px 0;

  font-family: $ff__dosis;
  font-size: 16px;
  text-align: left;

  &__exit {
    position: absolute;
    top: 8px;
    right: 5px;
    line-height: 0;
    margin: 0;
    padding: 0;
    width: 25px;
    border: none;
    background: none;
    color: $darkest-grey;
  }

  &__header {
    margin-top: 0;
    margin-bottom: 10px;
    text-align: center;
    font-size: 20px;
    text-transform: uppercase;
  }

  &__buttons {
    margin-top: 20px;
    align-self: center;
    >button {
      width: 120px;
    }
  }
}

.label {
  display: block;
  text-align: left;
  text-transform: uppercase;
  font-size: 16px;
  margin: 5px 10px;
}

.orders {
  max-height: 182px;
}

.item {
  height: 28px;
  padding: 5px 10px;
  margin: 2px 10px;
  background: $light-beige;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
}

.tax {
  align-items: center;
  &__box {
    margin-top: 3px;
    padding: 0;
    border: none;
    background: none;
    position: relative;

    &--check {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-30%, -60%);
      color: blue;
    }
  }

  &__label {
    flex: 1;
    margin-left: 10px;
    text-transform: uppercase;
  }
}

.price {
  min-width: 70px;
}

.total {
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
}
</style>
