<template>
<div class="summary">
  <div class="well">
    <div class="header">
      <button class="header__back" @click="setScreenSm('tables')">
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
      <clients class="view__clients" :clients="clients" />
    </div>

    <div class="footer">
      <div class="footer__buttons" v-show="getActiveClient !== -1">
        <button class="footer__button" @click="checkoutClient">
          Fechar cliente
        </button>
        <button class="footer__button" @click="clientOrders">
          Ver pedidos
        </button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import SmallLogo from '@/components/SmallLogo'
import Clients from '@/components/Clients'
import { mapState, mapGetters, mapActions } from 'vuex'
import { eventBus } from '@/main'

export default {
  name: 'Summary',
  components: {
    SmallLogo,
    Clients
  },
  watch: {
    currentTableIndex (index) {
      console.log('You have selected the table ' + (index + 1))
      this.$nextTick(() => { this.resetData(index) })
    }
  },
  computed: {
    ...mapState(['currentTableIndex']),
    ...mapGetters([
      'getClients',
      'getTable',
      'getTableOrders',
      'getActiveClient'
    ])
  },
  created () {
    eventBus.$on('addClient', () => {
      this.$nextTick(() => {
        this.table = this.getTable(this.tableIndex)
        this.clients = this.getClients(this.table.clients)
      })
    })
  },
  data () {
    return {
      view: 'clients',
      table: null,
      clients: null,
      orders: null,
      tableNumber: null,
      tableIndex: null
    }
  },
  methods: {
    ...mapActions(['setScreenSm']),

    resetData (index) {
      this.table = this.getTable(index)
      this.clients = this.getClients(this.table.clients)
      this.orders = this.getTableOrders(index)
      this.tableNumber = index + 1
      this.tableIndex = index
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
  background: $color__well;
  box-shadow: 6px 6px 10px 0px rgba(0,0,0,0.23);
  border-radius: $br__default;
  flex: 1;
  overflow-y: hidden;

  display: flex;
  flex-direction: column;
}

.header {
  background: $color__dark-grey;
  color: $color__header-text;
  padding: 10px;

  &__back {
    display: flex;
    align-items: center;
    font-family: $ff__dosis;
    font-size: 14px;
    font-weight: bold;
    color: $color__header-text;
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
    border: 1px solid $color__header-text;
    background: transparent;
    height: 32px;
    width: 120px;
    margin: 0 10px;
    font-family: $ff__dosis;
    font-size: 20px;

    text-transform: uppercase;
    color: $color__header-text;

    &--active {
      background: $color__button--active;
      border-color: $color__button--active;
      color: $color__dark-grey;
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

.footer {
  height: 50px;
  background: $color__dark-grey;
  color: $color__header-text;

  &__buttons {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }

  &__button {
    border-radius: 8px;
    border: 1px solid $color__header-text;
    background: transparent;
    height: 32px;
    width: 150px;
    margin: 0 6px;
    font-family: $ff__dosis;
    font-size: 18px;
    font-weight: bold;

    text-transform: uppercase;
    color: $color__header-text;

    &--active {
      background: $color__button--active;
      border-color: $color__button--active;
      color: $color__dark-grey;
      font-weight: bold;
    }
  }
}
</style>
