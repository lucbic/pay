import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions(['toggleActiveOrderStatus', 'deleteActiveOrder']),
    cancelOrder () {
      const content = `Deseja cancelar o pedido \n ${this.activeOrderProduct.amount} unid. - ${this.activeOrderProduct.name}?`
      this.$refs.modal.show(content).then(() => {
        this.deleteActiveOrder()
      }, () => {})
    },
    orderDelivered () {
      const content = `Deseja marcar o pedido \n ${this.activeOrderProduct.amount} unid. - ${this.activeOrderProduct.name} como entregue?`
      this.$refs.modal.show(content).then(() => {
        this.toggleActiveOrderStatus()
      }, () => {})
    }
  }
}
