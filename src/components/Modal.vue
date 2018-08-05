<template lang="html">
  <div v-show="active" class="wrapper">
    <div class="overlay" @click="reply(false)"/>
    <div class="modal">
      <button class="modal__exit" @click="reply(false)">
        <simple-svg :filepath="'static/img/times-solid.svg'" :width="'14px'" />
      </button>
      <p class="modal__content">
        {{ content }}
      </p>
      <div class="modal__buttons">
        <button v-if="!info" class="btn orange" @click="reply(false)">
          <span v-if="mode === 'yes-no' ">Não</span>
          <span v-if="mode === 'ok-cancel' ">Cancelar</span>
        </button>
        <button class="btn green" @click="reply(true)">
          <span v-if="mode === 'yes-no' ">Sim</span>
          <span v-if="mode === 'ok-cancel' ">Ok</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Modal',
  props: {
    info: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: 'ok-cancel'
    }
  },
  data () {
    return {
      active: false,
      content: ''
    }
  },
  computed: {
    ...mapGetters(['activeClientName'])
  },
  methods: {
    reply (val) {
      this.$emit('reply', val)
    },
    show (content) {
      this.content = content
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
  height: 100vh;
  width: 100vw;
  z-index: 1;
}

.overlay {
  background: $black;
  opacity: 0.7;
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
  justify-content: center;
  align-items: center;
  color: $darkest-grey;
  border-radius: 15px;
  padding: 40px 20px 40px;

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
  }

  &__content {
    font-family: $ff__dosis;
    font-size: 22px;
    text-align: center;
    margin-top: 0;
    margin-bottom: 80px;
    line-height: 1.2;
    white-space: pre-line;
  }

  &__buttons {
    position: absolute;
    bottom: 30px;
    >button {
      width: 120px;
    }
  }

  .par {
    margin-top: 0;
  }
}
</style>
