<template>
<div class="client" @click="setActiveClient(client.id)"
  :class="{ 'client--active': active }" id="client-component">
  <div>
    <simple-svg class="client__icon" :width="'14px'"
      :filepath="'static/img/user-solid.svg'" />
    <span class="client__name">
      {{ client.name }}
    </span>
  </div>
  <span class="client__total">
    {{ getClientTotal(client.id) }}
  </span>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Client',
  props: [ 'client' ],
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['getClientOrders', 'getActiveClient', 'getClientTotal']),

    active () {
      return this.getActiveClient === this.client.id
    }
  },
  methods: {
    ...mapActions(['setActiveClient'])
  }
}
</script>

<style lang="scss" scoped>
.client {
  background: $color__dark-grey;
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 6px 10px;
  margin: 5px 16px;
  color: $color__header-text;
  font-family: $ff__dosis;
  font-size: 20px;
  border-radius: 10px;
  height: 35px;

  &__icon,
  &__name,
  &__total {
    display: inline-block;
  }

  &__name {
    margin-left: 5px;
  }

  &--active {
    background: $color__button--active;
    color: $color__dark-grey;
  }
}
</style>
