<template>
<div class="summary">
  <div class="well">
    <div class="header">
      <button class="header__back" @click="backToTables">
        <simple-svg class="header__back-img" :width="'12px'"
          :filepath="'static/img/long-arrow-alt-left-solid.svg'" />
        <span>Mesas</span>
      </button>
      <small-logo class="summary__logo" />
      <h1 class="header__table-number">
        Mesa {{ tableNumber }}
      </h1>
      <div class="header__buttons">
        <button class="header__button" @click="view = 'clients'"
          :class="{ 'header__button--active': view === 'clients' }">
          Clientes
        </button>
        <button class="header__button" @click="view = 'orders'"
          :class="{ 'header__button--active': view === 'orders' }">
          Pedidos
        </button>
      </div>
    </div>

    <div class="view">
      <clients v-show="view === 'clients'" class="view__clients" :clients="clients" />
      <orders v-show="view === 'orders'" class="view__orders" :orders="orders" />
    </div>

    <div class="total">
      <span>Total:</span>
      <span>{{ localeTotal }}</span>
    </div>

    <div class="footer">
      <div class="footer__buttons" v-show="buttonsClient">
        <button class="footer__button" @click="checkoutClient">
          Fechar cliente
        </button>
        <button class="footer__button" @click="clientOrders">
          Ver pedidos
        </button>
      </div>
      <div class="footer__buttons" v-show="buttonCheckout">
        <button class="footer__button" @click="checkoutClient">
          Fechar Conta
        </button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import SmallLogo from '@/components/SmallLogo'
import Clients from '@/components/Clients'
import Orders from '@/components/Orders'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'Summary',
  components: {
    SmallLogo,
    Clients,
    Orders
  },
  computed: {
    ...mapState(['currentTableIndex']),
    ...mapGetters([
      'getClients',
      'getTable',
      'getTableOrders',
      'getActiveClient',
      'getTotal'
    ]),
    table () {
      if (this.currentTableIndex === null) { return }
      return this.getTable(this.currentTableIndex)
    },
    clients () {
      if (this.currentTableIndex === null) { return }
      return this.getClients(this.table.clients)
    },
    orders () {
      if (this.currentTableIndex === null) { return }
      return this.getTableOrders(this.currentTableIndex)
    },
    tableNumber () {
      if (this.currentTableIndex === null) { return }
      return this.currentTableIndex + 1
    },
    localeTotal () {
      if (this.currentTableIndex === null) { return }
      let localeTotal = this.getTotal(this.currentTableIndex)
      return localeTotal.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).replace('R$', 'R$ ')
    },
    buttonsClient () {
      return this.getActiveClient !== -1
    },
    buttonCheckout () {
      return this.getActiveClient === -1
    }
  },
  data () {
    return {
      view: 'clients'
    }
  },
  methods: {
    ...mapActions(['setScreenSm', 'setActiveClient']),
    backToTables () {
      this.setActiveClient(-1)
      this.setScreenSm('tables')
      window.setTimeout(() => {
        this.view = 'clients'
      }, 200)
    },
    checkoutClient () {

    },
    clientOrders () {

    }
  }
}
</script>

<style lang="scss" scoped>
.summary {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;

  &__logo {
    margin: 10px auto 0;
    position: absolute;
    top: 5px;
    left: 50%;
    transform: translateX(-50%);
  }
}

.well {
  margin: $size__well-margin;
  margin-top: 10px;
  background: $white;
  box-shadow: 6px 6px 10px 0px rgba(0,0,0,0.23);
  border-radius: 15px;
  flex: 1;
  overflow-y: hidden;

  display: flex;
  flex-direction: column;
}

.header {
  background: $dark-grey;
  color: $white;
  padding: 10px;

  &__back {
    display: flex;
    align-items: center;
    font-family: $ff__dosis;
    font-size: 14px;
    font-weight: bold;
    color: $white;
    text-transform: uppercase;
    background: transparent;
    border-style: none;

    > span { margin-left: 5px; }

    &-img { margin-top: 2px; }
  }

  &__buttons {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }

  &__button {
    border-radius: 8px;
    border: 1px solid $white;
    background: transparent;
    height: 32px;
    width: 120px;
    margin: 0 10px;
    font-family: $ff__dosis;
    font-size: 20px;

    text-transform: uppercase;
    color: $white;

    &--active {
      background: $avocado;
      border-color: $avocado;
      color: $dark-grey;
      font-weight: bold;
    }
  }

  &__table-number {
    margin: 0;
    margin-top: 12px;
    text-align: center;
    font-family: $ff__dosis;
    font-size: 20px;
    font-weight: normal;
    text-transform: uppercase;
  }
}

.view {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.total {
  background: $avocado;
  height: 40px;
  font-family: $ff__dosis;
  font-size: 24px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
}

.footer {
  height: 50px;
  background: $dark-grey;
  color: $white;

  &__buttons {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__button {
    border-radius: 8px;
    border: 2px solid $white;
    background: $light-grey;
    height: 32px;
    width: 150px;
    margin: 0 6px;
    font-family: $ff__dosis;
    font-size: 18px;
    font-weight: bold;

    text-transform: uppercase;
    color: $darkest-grey;

    &--active {
      background: $avocado;
      border-color: $avocado;
      color: $dark-grey;
      font-weight: bold;
    }
  }
}
</style>
