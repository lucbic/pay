<template>
<div class="make-order">
  <make-order-modal ref="modal"></make-order-modal>
  <div class="well">
    <div class="header">
      <button class="header__back" @click="backToSummary">
        <simple-svg class="header__back-img" :width="'12px'"
          :filepath="'static/img/long-arrow-alt-left-solid.svg'" />
        <span>Voltar</span>
      </button>
      <small-logo class="make-order__logo" />
      <h1 class="header__table-number">
        Novo Pedido - Mesa {{ tableNumber }}
      </h1>
      <div class="header__buttons">
        <button v-for="category in categories" class="btn-carousel" @click="view = category"
          :class="{ 'active': view === category }">
          <simple-svg :width="'36px'" :filepath="imgPath(category)" />
        </button>
      </div>
    </div>

    <div class="products">
      <h1 class="make-order__division"> {{ translateCategory(view) }} </h1>
      <div class="products__labels">
        <span>Item</span>
        <span>Preço</span>
      </div>
      <template v-for="category in categories">
        <div v-show="category === view" class="products__slide" v-bar>
          <div class="products__slide-wrapper">
            <product v-for="product in productsList(category)" :product="product"
              :key="`product-${productsList(category).indexOf(product)}`"
              @add="addNewOrder" />
          </div>
        </div>
      </template>
    </div>

    <div class="orders-list">
      <h1 class="make-order__division">Itens Selecionados</h1>
      <div class="orders-list__labels">
        <span>Item</span>
        <span>Cliente</span>
        <span class="orders-list__center">Qtd.</span>
        <span class="orders-list__center">Preço</span>
      </div>
      <div class="orders-list__content" v-bar>
        <div class="orders-list__content-wrapper">
          <order v-for="order in newOrders" :order="order"
            :key="`order-${newOrders.indexOf(order)}`"
            :new-order="true" :active-new-order="activeNewOrder"
            @setActiveNewOrder="setActiveNewOrder" />
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="footer__buttons">
        <button class="btn orange large" @click=""
          v-show="true">
          Confirmar Pedido
        </button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import SmallLogo from '@/components/SmallLogo'
import Modal from '@/components/Modal'
import Product from '@/components/Product'
import Order from '@/components/Order'
import MakeOrderModal from '@/components/MakeOrderModal'
import Split from 'split.js'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'MakeOrder',
  components: {
    SmallLogo,
    Modal,
    Product,
    Order,
    MakeOrderModal
  },
  watch: {
    view () {

    }
  },
  computed: {
    ...mapState(['currentTableIndex']),
    ...mapGetters(['productsList']),
    tableNumber () {
      if (this.currentTableIndex === null) { return }
      return this.currentTableIndex + 1
    },
    buttonConfirm () {

    }
  },
  mounted () {
    Split(['.products', '.orders-list'], {
      sizes: [55, 45],
      direction: 'vertical',
      gutterSize: 15,
      minSize: [50, 50],
      snapOffset: 0
    })
  },
  data () {
    return {
      view: 'drinks',
      categories: ['drinks', 'dishes', 'sides', 'desserts'],
      newOrders: [],
      activeNewOrder: -1
    }
  },
  methods: {
    ...mapActions(['setScreenSm']),
    imgPath (view) {
      const path = 'static/img/' + view
      if (this.view === view) {
        return path + '-color.svg'
      } else {
        return path + '.svg'
      }
    },
    backToSummary () {
      this.setScreenSm('summary')
      window.setTimeout(() => {
        this.view = 'drinks'
      }, 200)
    },
    translateCategory (category) {
      switch (category) {
        case 'drinks':
          return 'Bebidas'
        case 'dishes':
          return 'Pratos'
        case 'sides':
          return 'Porções'
        case 'desserts':
          return 'Sobremesas'
      }
    },
    addNewOrder (product) {
      this.$refs.modal.show(product)
      this.$refs.modal.show(product).then(order => {
        this.newOrders.push(order)
      }, () => {})
    },
    setActiveNewOrder (id) {
      this.activeNewOrder = id
    }
  }
}
</script>

<style lang="scss" scoped>
.make-order {
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

.products {
  display: flex;
  flex-direction: column;

  &__slide {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  &__slide-wrapper {
    >div:first-child {
      margin-top: 0;
    }
  }

  &__labels {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: $ff__dosis;
    font-size: 16px;
    font-weight: bold;
    padding: 0 44px 0 35px;
    min-height: 28px;
  }
}

.orders-list {
  display: flex;
  flex-direction: column;

  &__labels {
    @extend %orders-new-grid;
    align-items: center;
    min-height: 28px;
    background: $white;
    font-family: $ff__dosis;
    font-size: 14px;
    font-weight: bold;
  }

  &__content {
    @extend %striped-background;
    flex: 1;
  }

  &__center {
    justify-self: center;
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
</style>
