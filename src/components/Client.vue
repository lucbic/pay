<template>
<div class="client" @click="activate"
  :class="{ 'client--active': active,
            'client--modal': modal,
            'client--paid': client.paid}" id="client-component">
    <simple-svg class="client__icon" :width="'14px'"
      :filepath="icon" />
    <span class="client__name">
      {{ client.name }}
    </span>
  <span v-show="!modal" class="client__total">
    {{ localeTotal }}
  </span>
</div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'Client',
  props: [ 'client', 'modal', 'modal-active-client' ],
  computed: {
    ...mapState(['activeClient']),
    ...mapGetters(['clientTotal']),

    active () {
      const active = this.modal ? this.modalActiveClient : this.activeClient
      return active === this.client.id
    },
    localeTotal () {
      let localeTotal = this.clientTotal(this.client.id)
      localeTotal = localeTotal.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })

      return localeTotal.replace('R$', 'R$ ')
    },
    icon () {
      if (this.client.paid) {
        return 'static/img/check-solid.svg'
      } else {
        return 'static/img/user-solid.svg'
      }
    }
  },
  methods: {
    ...mapActions(['setActiveClient', 'setActiveOrder']),

    activate () {
      if (this.modal) { return this.$emit('setModalActiveClient', this.client.id) }
      if (this.activeClient === this.client.id || this.client.paid) { return }
      this.setActiveClient(this.client.id)
      this.setActiveOrder(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.client {
  background: $dark-grey;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 0 10px;
  margin: 5px 16px;
  color: $white;
  font-family: $ff__dosis;
  font-size: 20px;
  border-radius: 10px;
  height: 35px;
  overflow: hidden;
  cursor: pointer;

  &__icon,
  &__name,
  &__total {
    display: block;
  }

  &__name {
    flex: 1;
    margin-left: 8px;
  }

  &--active {
    background: $avocado;
    color: $dark-grey;
  }

  &--modal {
    margin: 5px 20px;
    height: 30px;
    padding: 0 10px;
  }

  &--paid {
    background: $turquoise;
  }
}
</style>
