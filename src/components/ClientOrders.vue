<template>
<div class="client-orders">
  <modal :mode="modalMode" ref="modal" />
  <checkout :client="true" ref="checkout" />
  <div class="well">
    <div class="header">
      <button class="header__back" @click="backToSummary">
        <simple-svg class="header__back-img" :width="'12px'"
          :filepath="'static/img/long-arrow-alt-left-solid.svg'" />
        <span>Voltar</span>
      </button>
      <small-logo class="client-orders__logo" />
      <h1 class="header__table-number">
        Mesa {{ tableNumber }}
      </h1>
    </div>

    <div class="division">
      Cliente: {{ activeClientName }}
    </div>

    <div class="view">
      <orders class="view__orders" :client="true" />
    </div>

    <div class="total">
      <span>Total:</span>
      <span>{{ localeTotal }}</span>
    </div>

    <div class="footer">
      <div class="footer__buttons">
        <button class="btn orange" @click="checkout"
          v-show="buttonCheckout">
          Fechar Cliente
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
import Orders from '@/components/Orders'
import Modal from '@/components/Modal'
import Checkout from '@/components/Checkout'
import OrdersMixin from '@/mixins/OrdersMixin'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'ClientOrders',
  components: {
    SmallLogo,
    Orders,
    Modal,
    Checkout
  },
  mixins: [OrdersMixin],
  computed: {
    ...mapState(['currentTableIndex', 'activeOrder']),
    ...mapGetters([
      'activeClientTotal',
      'activeOrderStatus',
      'activeClientName',
      'activeOrderProduct',
      'clientCkeckoutReady'
    ]),

    tableNumber () {
      if (this.currentTableIndex === null) { return }
      return this.currentTableIndex + 1
    },
    localeTotal () {
      if (!this.activeClientTotal) { return 'R$ 0,00' }
      let localeTotal = this.activeClientTotal
      return localeTotal.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).replace('R$', 'R$ ')
    },
    buttonCheckout () {
      return (this.activeOrder === -1)
    },
    buttonOrder () {
      return !this.activeOrderStatus && this.activeOrder !== -1
    }
  },
  data () {
    return {
      modalMode: 'yes-no'
    }
  },
  methods: {
    ...mapActions(['setScreenSm', 'setActiveOrder']),

    backToSummary () {
      this.setScreenSm('summary')
      window.setTimeout(() => { this.setActiveOrder(-1) }, 400)
    },
    checkout () {
      if (this.clientCkeckoutReady) {
        this.$refs.checkout.show()
      } else {
        const content = 'A conta do cliente só pode ser fechada quando todos os pedidos constarem como entregues.'
        this.modalMode = 'info'
        this.$refs.modal.show(content)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.client-orders {
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

.division {
  margin: 0;
  padding: 12px 0;
  text-align: center;
  font-family: $ff__dosis;
  font-size: 16px;
  font-weight: bold;
  background: $darkest-grey;
  color: $white;
  text-transform: uppercase;
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
