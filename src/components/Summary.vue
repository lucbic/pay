<template>
<div class="summary" ref="summary">
  <full-screen />
  <modal ref="modal" />
  <checkout ref="checkout" />
  <div class="well">
    <div class="header">
      <button class="header__back" @click="backToTables">
        <simple-svg class="header__back-img" :width="'12px'"
          :filepath="'static/img/long-arrow-alt-left-solid.svg'" />
        <span>Mesas</span>
      </button>
      <small-logo class="summary__logo" />
      <h1 v-if="currentTableIndex !== null" class="header__table-number">
        Mesa {{ tableNumber }}
      </h1>
      <div class="header__buttons">
        <button class="btn header-select" @click="view = 'clients'"
          :class="{ 'active': view === 'clients' }">
          Clientes
        </button>
        <button class="btn header-select" @click="view = 'orders'"
          :class="{ 'active': view === 'orders' }">
          Pedidos
        </button>
      </div>

    </div>

    <div class="view">
      <div class="view__gutter" />
      <clients v-show="clientsConditions" class="view__clients" />
      <div class="view__gutter" />
      <orders v-show="ordersConditions" :client="activeClient !== -1" class="view__orders" />
      <div class="view__gutter" />
    </div>

    <div class="footer">
      <div class="footer__buttons">
        <button class="btn green btn-checkout" @click="checkout"
          v-show="buttonCheckout">
          Fechar Conta
        </button>

        <button class="btn font-sm btn-remove-client" @click="deleteClient"
          v-show="buttonRemoveClient">
          Remov. Cliente
        </button>

        <button class="btn font-sm orange btn-orders" @click="clientOrders"
          v-show="buttonClient">
          Pedidos Cliente
        </button>

        <button class="btn btn-cancel-order" @click="cancelOrder"
          v-show="buttonOrder">
          Cancelar
        </button>

        <button class="btn orange btn-order-delivered" @click="orderDelivered"
          v-show="buttonOrder">
          Entregue
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
import Modal from '@/components/Modal'
import FullScreen from '@/components/FullScreen'
import Checkout from '@/components/Checkout'
import OrdersMixin from '@/mixins/OrdersMixin'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'Summary',
  components: {
    SmallLogo,
    Clients,
    Orders,
    Modal,
    FullScreen,
    Checkout
  },
  mixins: [OrdersMixin],
  watch: {
    view () {
      this.setActiveClient(-1)
      this.setActiveOrder(-1)
    },
    fixedScreen (val) {
      if (val !== -1) {
        this.$refs.summary.style.height = val + 'px'
      } else {
        this.$refs.summary.style.height = '100vh'
      }
    },
    screenSm (val) {
      if (val === 'tables') {
        window.setTimeout(() => {
          this.setActiveOrder(-1)
          this.setActiveClient(-1)
          this.view = 'clients'
        }, 400)
      }
    }
  },
  computed: {
    ...mapState([
      'currentTableIndex',
      'activeOrder',
      'activeClient',
      'fixedScreen',
      'screenSm'
    ]),
    ...mapGetters([
      'getTotal',
      'activeClientTotal',
      'activeOrderStatus',
      'activeClientName',
      'activeOrderProduct',
      'tableCheckoutReady'
    ]),
    tableNumber () {
      if (this.currentTableIndex === null) { return }
      return this.currentTableIndex + 1
    },
    buttonClient () {
      if (this.$mq === 'sm') {
        return this.view === 'clients' && this.activeClient !== -1
      } else {
        return false
      }
    },
    buttonRemoveClient () {
      if (this.$mq === 'sm') {
        return this.activeClientTotal === 0 && this.view === 'clients' && this.activeClient !== -1
      } else {
        return this.activeClientTotal === 0
      }
    },
    buttonCheckout () {
      if (this.$mq === 'sm') {
        return this.activeOrder === -1 && this.activeClient === -1 && this.getTotal > 0
      } else {
        return this.getTotal > 0
      }
    },
    buttonOrder () {
      if (this.$mq === 'sm') {
        return !this.activeOrderStatus && this.view === 'orders' && this.activeOrder !== -1
      } else {
        return !this.activeOrderStatus && this.activeOrder !== -1
      }
    },
    clientsConditions () {
      return this.$mq === 'sm' ? this.view === 'clients' : true
    },
    ordersConditions () {
      return this.$mq === 'sm' ? this.view === 'orders' : true
    }
  },
  data () {
    return {
      view: 'clients'
    }
  },
  methods: {
    ...mapActions([
      'setScreenSm',
      'setActiveClient',
      'setActiveOrder',
      'toggleActiveOrderStatus',
      'deleteActiveOrder',
      'deleteActiveClient'
    ]),
    backToTables () {
      this.setScreenSm('tables')
    },
    clientOrders () {
      this.setActiveOrder(-1)
      this.setScreenSm('client-orders')
    },
    checkout () {
      if (this.tableCheckoutReady) {
        this.$refs.checkout.show()
      } else {
        const content = 'A conta só pode ser fechada quando todos os pedidos forem entregues.'
        this.$refs.modal.show(content, 'info')
      }
    },
    deleteClient () {
      const content = `Deseja excluir o cliente \n ${this.activeClientName}?`
      this.$refs.modal.show(content, 'yes-no').then(() => {
        this.deleteActiveClient()
      }, () => {})
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
    margin: 0 auto;
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
  position: relative;
  min-height: 45px;

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
    cursor: pointer;

    > span { margin-left: 5px; }

    &-img { margin-top: 2px; }
  }

  &__buttons {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }

  &__table-number {
    margin: 0;
    margin-top: 15px;
    text-align: center;
    font-family: $ff__dosis;
    font-size: 20px;
    font-weight: normal;
    text-transform: uppercase;
  }

  &__section {
    margin-top: 10px;
    height: 32px;
    font-family: $ff__dosis;
    font-size: 20px;
    text-transform: uppercase;
    font-weight: bold;
    color: $white;
    justify-content: center;
    align-items: center;
    display: none;
  }
}

.view {
  flex: 1;
  display: flex;
  flex-direction: column;

  &__gutter {
    display: none;
    min-width: 10px;
    background: $dark-grey;
  }
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
}

/* ------ MEDIA-QUERIES  ------ */
@media all and (min-width: $breakpoint__sm) {
  .header__back,
  .header__buttons,
  .summary__logo { display: none; }

  .header__section { display: flex; }

  .summary {
    height: 100%;
    width: 100%;
  }

  .header__table-number {
    margin-top: 0;
  }

  .view {
    flex-direction: row;

    &__gutter {
      display: block;
    }
  }

  .footer__buttons {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 10px;
    justify-items: center;
    margin: 0 10px;
  }

  .btn {
    &-checkout { grid-column: 1 / 2; font-size: 16px; }
    &-remove-client { grid-column: 2 / 3; }
    &-cancel-order { grid-column: 3 / 4; }
    &-order-delivered { grid-column: 4 / 5; }
  }
}
</style>
