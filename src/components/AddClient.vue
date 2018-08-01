<template>
<div class="add-client" @click="activate" v-click-outside="onClickOutside"
  :class="{ 'add-client--active': active }" @keyup.enter="add">
  <simple-svg class="add-client__icon" :width="'14px'"
    :filepath="'static/img/plus-circle-solid.svg'" />
  <span v-if="!active" class="add-client__label">
    Adicionar Cliente
  </span>
  <input v-if="active" type="text" class="add-client__input"
  v-model="name" ref="teste">
</div>
</template>

<script>
import { mapActions } from 'vuex'
import { eventBus } from '@/main'

export default {
  name: 'AddClient',
  data () {
    return {
      active: false,
      name: ''
    }
  },
  methods: {
    ...mapActions(['addClient']),

    activate () {
      if (this.active) { return }

      this.active = true
      this.$nextTick(() => { this.$refs.teste.focus() })
    },
    add () {
      if (!this.active) { return }

      eventBus.$emit('addClient')
      this.addClient(this.name)
      this.resetComponent()
    },
    resetComponent () {
      this.name = ''
      this.active = false
    },
    onClickOutside () {
      if (!this.active) { return }

      this.resetComponent()
    }
  }
}
</script>

<style lang="scss" scoped>
.add-client {
  background: $color__pumpkin;
  padding: 6px 10px;
  margin: 5px 16px;
  color: $color__header-text;
  font-family: $ff__dosis;
  font-size: 20px;
  font-weight: bold;
  border-radius: 10px;

  &__label,
  &__icon,
  &__input {
    display: inline-block;
  }

  &__label,
  &__input {
    margin-left: 5px;
    height: 22px;
  }

  &__input {
    color: $color__header-text;
    border-style: none;
    background: none;
    width: 70%;
  }

  &--active {
    background: $color__table-number;
  }
}
</style>
