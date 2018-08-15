<template lang="html">
  <transition name="fade">
    <div v-if="active" class="wrapper">
      <div class="overlay" @click="reply(false)"/>
      <div class="modal">
        <button class="modal__exit" @click="reply(false)">
          <simple-svg :filepath="'static/img/times-solid.svg'" :width="'14px'" />
        </button>
        <div class="header">
          Item Selecionado
        </div>
        <h1 class="division">{{ product.name }}</h1>
        <span class="client-name">Cliente</span>
        <div class="clients">
          <client v-for="client in tableClients"
            v-if="!client.paid"
            :key="`client-${tableClients.indexOf(client)}`"
            @setModalActiveClient="setModalActiveClient"
            :client="client" :modal="true"
            :modal-active-client="modalActiveClient"/>
        </div>
        <div class="amount division">
          <span class="amount__label">Quantidade</span>
          <button class="amount__btn" @click="changeAmount('minus')">
            <img src="static/img/minus-circle-solid.svg" style="width: 17px;">
          </button>
          <span class="amount__number">{{ amount }}</span>
          <button class="amount__btn" @click="changeAmount('plus')">
            <img src="static/img/plus-circle-solid.svg" style="width: 17px;">
          </button>
        </div>
        <div class="footer">
          <div class="footer__buttons">
            <button class="btn" @click="reply(false)">
              Cancelar
            </button>
            <button class="btn orange" @click="reply(true)">
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Client from '@/components/Client'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'MakeOrderModal',
  components: { Client },
  props: ['client'],
  data () {
    return {
      active: false,
      product: null,
      amount: 1,
      modalActiveClient: null
    }
  },
  computed: {
    ...mapState(['activeClient']),
    ...mapGetters(['tableClients', 'clientName'])
  },
  methods: {
    reply (val) {
      this.$emit('reply', val)
    },
    show (product) {
      if (this.client) {
        this.modalActiveClient = this.activeClient
      } else {
        this.modalActiveClient = this.tableClients[0].id
        this.modalActiveClient = this.tableClients.find(x => !x.paid).id
      }
      this.product = product
      this.active = true
      const self = this
      return new Promise((resolve, reject) => {
        self.$on('reply', val => {
          const order = {
            id: null,
            amount: this.amount,
            client_id: this.modalActiveClient,
            product_id: this.product.id,
            paid: false,
            status: false
          }
          this.reset()
          val ? resolve(order) : reject(val)
        })
      })
    },
    changeAmount (type) {
      switch (type) {
        case 'plus':
          if (this.amount < 9) { this.amount += 1 }
          break
        case 'minus':
          if (this.amount > 1) { this.amount -= 1 }
          break
      }
    },
    setModalActiveClient (id) {
      this.modalActiveClient = id
    },
    reset () {
      this.$nextTick(() => {
        this.active = false
        this.product = null
        this.amount = 1
        this.modalActiveClient = null
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: fixed;
  top: 0;
  left: 0;
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

.modal {
  z-index: 2;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(100vw - 20px);
  background: $white;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  justify-content: space-between;
  overflow-y: hidden;

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
    color:  $white;
    cursor: pointer;
  }
}

.header {
  text-transform: uppercase;
  text-align: center;
  font-family: $ff__dosis;
  font-size: 18px;
  font-weight: bold;
  color:  $white;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: $dark-grey;
}

.division {
  margin: 0;
  padding: 5px 0;
  text-align: center;
  font-family: $ff__dosis;
  font-size: 18px;
  font-weight: bold;
  background: $darkest-grey;
  color: $white;
}

.client-name {
  padding: 10px 30px 0;

  font-family: $ff__dosis;
  font-size: 18px;
  font-weight: bold;
}

.clients {
  margin: 4px 0 8px;
}

.amount {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  >span { display: block;}

  &__label {
    text-align: left;
    flex:1
  }

  &__number {
    width: 30px;
  }

  &__btn {
    background: none;
    border: none;
    padding: 0;
    height: 25px;
    width: 25px;
    font-family: inherit;
    font-size: 22px;
    color: inherit;
    padding-top: 1px;
    cursor: pointer;
  }
}

.footer {
  height: 70px;
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
  .modal { max-width: 400px; }
}
</style>
