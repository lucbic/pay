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
  <button v-if="active" class="add-client__send" @click="add">
    <img src="static/img/send.svg" style="width: 14px;">
  </button>
</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'AddClient',
  data () {
    return {
      active: false,
      name: ''
    }
  },
  methods: {
    ...mapActions(['addClient', 'setFixedScreen']),

    activate () {
      if (this.active) { return }

      const height = window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight
      this.setFixedScreen(height)
      this.active = true
      this.$nextTick(() => { this.$refs.teste.focus() })
    },
    add () {
      if (!this.active) { return }

      this.setFixedScreen(-1)
      this.addClient(this.name)
      this.reset()
    },
    reset () {
      this.name = ''
      this.active = false
    },
    onClickOutside () {
      if (this.active) { this.reset() }
    }
  }
}
</script>

<style lang="scss" scoped>
.add-client {
  background: $pumpkin;
  padding: 0 20px 0 10px;
  margin: 5px 16px;
  height: 35px;
  color: $white;
  font-family: $ff__dosis;
  font-size: 20px;
  font-weight: bold;
  border-radius: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;

  &__label { margin-left: 5px; }

  &__input {
    margin-left: 8px;
    color: $white;
    border-style: none;
    background: none;
    flex: 1;
  }

  &__send {
    border: none;
    background: none;
    padding: 0;
    width: 30px;
    cursor: pointer;
  }

  &--active {
    background: $dark-grey;
    cursor: auto;
  }
}
</style>
