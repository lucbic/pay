<template>
<div class="make-order">
  <full-screen />
  <make-order-modal :client="client" ref="modal"></make-order-modal>
  <div class="well">
    <div class="header">
      <button class="header__back" @click="back">
        <simple-svg class="header__back-img" :width="'12px'"
          :filepath="'static/img/long-arrow-alt-left-solid.svg'" />
        <span>Voltar</span>
      </button>
      <small-logo class="make-order__logo" />
      <h1 class="header__table-number">
        Novo Pedido - Mesa {{ tableNumber }}
      </h1>
      <div class="header__buttons">
        <button v-for="category in categories" class="btn-carousel" @click="view = category.name"
          :class="{ 'active': view === category.name }">
          <img :src="category.icon" style="width: 36px;">
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
        <div v-show="view === category.name" class="products__slide" v-bar>
          <div class="products__slide-wrapper">
            <product v-for="(product, pIndex) in productsList(category.name)" :product="product"
              :key="`product-${pIndex}`"
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
      <div class="orders-list__content" v-bar ref="list">
        <div class="orders-list__content-wrapper">
          <order v-for="(order, index) in newOrders" :order="order"
            :key="`order-${index}`"
            :new-order="true"
            @deleteNewOrder="deleteNewOrder"/>
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="footer__buttons">
        <button class="btn orange large" @click="confirmOrders"
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
import Product from '@/components/Product'
import Order from '@/components/Order'
import MakeOrderModal from '@/components/MakeOrderModal'
import FullScreen from '@/components/FullScreen'
import Split from 'split.js'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'MakeOrder',
  components: {
    SmallLogo,
    Product,
    Order,
    MakeOrderModal,
    FullScreen
  },
  props: ['client'],
  computed: {
    ...mapState(['currentTableIndex']),
    ...mapGetters(['productsList']),
    tableNumber () {
      if (this.currentTableIndex === null) { return }
      return this.currentTableIndex + 1
    }
  },
  mounted () {
    this.split = Split(['.products', '.orders-list'], {
      sizes: [55, 45],
      direction: 'vertical',
      gutterSize: 15,
      minSize: [50, 50],
      snapOffset: 0
    })
    this.view = 'drinks'
  },
  data () {
    return {
      view: '',
      categories: [
        {
          name: 'drinks',
          icon: 'static/img/drinks.svg'
        },
        {
          name: 'dishes',
          icon: 'static/img/dishes.svg'
        },
        {
          name: 'sides',
          icon: 'static/img/sides.svg'
        },
        {
          name: 'desserts',
          icon: 'static/img/desserts.svg'
        }
      ],
      newOrders: [],
      split: null
    }
  },
  watch: {
    view (val) {
      const path = 'static/img/'
      this.categories.forEach(x => { x.icon = `${path}${x.name}.svg` })
      this.categories.find(x => x.name === val).icon = `${path}${val}-color.svg`
    }
  },
  methods: {
    ...mapActions(['setScreenSm', 'addOrders']),
    imgPath (view) {

    },
    back () {
      if (this.client) {
        this.setScreenSm('client-orders')
      } else {
        this.setScreenSm('summary')
      }
    },
    translateCategory (category) {
      switch (category) {
        case 'drinks': return 'Bebidas'
        case 'dishes': return 'Pratos'
        case 'sides': return 'Porções'
        case 'desserts': return 'Sobremesas'
      }
    },
    addNewOrder (product) {
      this.$refs.modal.show(product)
      this.$refs.modal.show(product).then(order => {
        this.newOrders.push(order)
      }, () => {})
    },
    deleteNewOrder (order) {
      const index = this.newOrders.indexOf(order)
      this.newOrders.splice(index, 1)
    },
    confirmOrders () {
      this.addOrders(this.newOrders)
      this.back()
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
    @extend %orders-grid;
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
