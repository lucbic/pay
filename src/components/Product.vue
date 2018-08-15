<template>
<div class="product" @click="add">
  <span class="product__name">
    {{ product.name }}
  </span>
  <span class="product__price">
    {{ localePrice }}
  </span>
</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Product',
  props: [ 'product' ],
  computed: {
    ...mapState(['currentTableIndex']),
    ...mapGetters(['tableClients']),

    localePrice () {
      let localePrice = this.product.price
      localePrice = localePrice.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })
      return localePrice.replace('R$', 'R$ ')
    }
  },
  methods: {
    add () {
      if (this.currentTableIndex !== null && this.tableClients.length > 0) {
        this.$emit('add', this.product)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.product {
  background: $dark-grey;
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 6px 10px;
  margin: 5px 16px;
  color: $white;
  font-family: $ff__dosis;
  font-size: 16px;
  border-radius: 10px;
  height: 30;
  cursor: pointer;

  &__name {
    display: block;
    flex: 1;
    margin-left: 8px;
  }

  &__price {
    display: block;
    width: 60px;
  }
}

@media all and (max-width: 350px) {
  .product { font-size: 14px; }
}
</style>
