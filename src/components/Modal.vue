<template lang="html">
  <div v-show="active" class="wrapper">
    <div class="overlay" @click="reply(false)"/>
    <div class="modal">
      <button class="modal__exit" @click="reply(false)">
        <simple-svg :filepath="'static/img/times-solid.svg'" :width="'14px'" />
      </button>
      <div class="modal__content">
        <span>{{ content }}</span>
      </div>
      <div class="modal__buttons">
        <button v-if="mode !== 'info'" class="btn orange" @click="reply(false)">
          <span v-if="mode === 'yes-no' ">Não</span>
          <span v-if="mode === 'ok-cancel' ">Cancelar</span>
        </button>
        <button class="btn green" @click="reply(true)">
          <span v-if="mode === 'yes-no' ">Sim</span>
          <span v-if="mode === 'ok-cancel' || mode === 'info'">Ok</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Modal',
  data () {
    return {
      active: false,
      content: '',
      mode: 'ok-cancel'
    }
  },
  computed: {
    ...mapGetters(['activeClientName'])
  },
  methods: {
    reply (val) {
      this.$emit('reply', val)
    },
    show (content, mode) {
      this.content = content
      this.mode = mode
      this.active = true
      const self = this
      return new Promise((resolve, reject) => {
        self.$on('reply', val => {
          this.active = false
          val ? resolve() : reject(val)
        })
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
  height: 200px;
  width: calc(100vw - 20px);
  background: $white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color: $darkest-grey;
  border-radius: 15px;
  padding: 20px;

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
    color: $darkest-grey;
    cursor: pointer;
  }

  &__content {
    font-family: $ff__dosis;
    font-size: 22px;
    text-align: center;
    line-height: 1.2;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &__buttons>button { width: 120px; }

  .par { margin-top: 0; }
}

/* ------ MEDIA-QUERIES  ------ */
@media all and (min-width: $breakpoint__sm) {
  .modal { max-width: 400px; }
}
</style>
