<template>
<div class="client" @click="activate"
  :class="{ 'client--active': active }" id="client-component">
    <simple-svg class="client__icon" :width="'14px'"
      :filepath="'static/img/user-solid.svg'" />
    <span class="client__name">
      {{ client.name }}
    </span>
  <span class="client__total">
    {{ localeTotal }}
  </span>
</div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'Client',
  props: [ 'client' ],
  computed: {
    ...mapState(['activeClient']),
    ...mapGetters(['clientTotal']),

    active () {
      return this.activeClient === this.client.id
    },
    localeTotal () {
      let localeTotal = this.clientTotal(this.client.id)
      localeTotal = localeTotal.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })

      return localeTotal.replace('R$', 'R$ ')
    }
  },
  methods: {
    ...mapActions(['setActiveClient']),

    activate () {
      if (this.activeClient === this.client.id) { return }
      this.setActiveClient(this.client.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.client {
  background: $dark-grey;
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 6px 10px;
  margin: 5px 16px;
  color: $white;
  font-family: $ff__dosis;
  font-size: 20px;
  border-radius: 10px;
  height: 35px;

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
}
</style>
