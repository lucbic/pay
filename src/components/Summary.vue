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
      <h1 class="header__table-number">
        Mesa {{ tableNumber }}
      </h1>
      <div class="header__buttons">
        <button class="btn header" @click="view = 'clients'"
          :class="{ 'active': view === 'clients' }">
          Clientes
        </button>
        <button class="btn header" @click="view = 'orders'"
          :class="{ 'active': view === 'orders' }">
          Pedidos
        </button>
      </div>
    </div>

    <div class="view">
      <clients v-show="view === 'clients'" class="view__clients" />
      <orders v-show="view === 'orders'" class="view__orders" />
    </div>

    <div class="total">
      <span>Total:</span>
      <span>{{ localeTotal }}</span>
    </div>

    <div class="footer">
      <div class="footer__buttons">
        <button class="btn font-sm orange" @click="deleteClient"
          v-show="buttonRemoveClient">
          Remover Cliente
        </button>

        <button class="btn font-sm" @click="clientOrders"
          v-show="buttonClient">
          Pedidos Cliente
        </button>

        <button class="btn orange" @click="checkout"
          v-show="buttonCheckout">
          Fechar Conta
        </button>

        <button class="btn orange" @click="cancelOrder"
          v-show="buttonOrder">
          Cancelar
        </button>

        <button class="btn green" @click="orderDelivered"
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
    }
  },
  computed: {
    ...mapState([
      'currentTableIndex',
      'activeOrder',
      'activeClient',
      'fixedScreen'
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
    localeTotal () {
      if (this.currentTableIndex === null) { return }
      let localeTotal = this.getTotal(this.currentTableIndex)
      return localeTotal.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).replace('R$', 'R$ ')
    },
    buttonClient () {
      return this.view === 'clients' && this.activeClient !== -1
    },
    buttonRemoveClient () {
      return this.activeClientTotal === 0 && this.buttonClient
    },
    buttonCheckout () {
      return (this.activeOrder === -1) && (this.activeClient === -1)
    },
    buttonOrder () {
      return !this.activeOrderStatus && this.view === 'orders' && this.activeOrder !== -1
    }
  },
  data () {
    return {
      view: 'clients'
    }
  },
  methods: {
    ...mapActions(['setScreenSm',
      'setActiveClient',
      'setActiveOrder',
      'toggleActiveOrderStatus',
      'deleteActiveOrder',
      'deleteActiveClient'
    ]),
    backToTables () {
      this.setScreenSm('tables')
      window.setTimeout(() => {
        this.setActiveOrder(-1)
        this.setActiveClient(-1)
        this.view = 'clients'
      }, 400)
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

  &__table-number {
    margin: 0;
    margin-top: 15px;
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
}
</style>
