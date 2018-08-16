<template>
<div class="clients" @click="deselect($event)">
  <div class="clients__division">Clientes</div>

  <div class="label">
    <span class="label__client">
      Cliente
    </span>
    <span class="label__value">
      Valor
    </span>
  </div>

  <div class="clients__content" v-bar>
    <div class="clients__content-wrapper" >
      <transition-group name="clients" tag="div">
        <client v-for="(client, index) in tableClients"
                :client="client" :key="`client-${index}`"/>
      </transition-group>
      <transition name="fade">
        <add-client v-if="currentTableIndex !== null" />
      </transition>
    </div>
  </div>

  <div class="total" >
    <span>Total:</span>
    <span>{{ localeTotal }}</span>
  </div>

</div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import Client from '@/components/Client'
import AddClient from '@/components/AddClient'

export default {
  name: 'Clients',
  components: {
    Client,
    AddClient
  },
  computed: {
    ...mapState(['activeClient', 'currentTableIndex']),
    ...mapGetters(['getTotal', 'tableClients']),

    localeTotal () {
      let localeTotal = this.getTotal
      return localeTotal.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).replace('R$', 'R$ ')
    }
  },
  methods: {
    ...mapActions(['setActiveClient']),

    deselect (event) {
      if (event.target.closest('#client-component')) { return }
      if (this.activeClient === -1) { return }
      this.setActiveClient(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.clients {
  flex: 1;
  display: flex;
  flex-direction: column;

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
    max-height: 28px;
    min-height: 28px;
    display: none;
  }

  &__content {
    flex: 1;
  }

  &__content-wrapper {
    > div:first-child {
      margin-top: 0;
    }
  }
}

.label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;

  font-family: $ff__dosis;
  font-size: 20px;
  font-weight: bold;

  &__client {
    margin-left: 30px;
  }

  &__value {
    margin-right: 30px;
  }
}

.total {
  background: $avocado;
  height: 40px;
  font-family: $ff__dosis;
  font-size: 24px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
}

/* ------ TRANSITIONS  ------ */
.clients-enter-active {
  max-height: 35px;
  transition: all .2s, opacity .2s .2s;
}

.clients-leave-active {
  max-height: 35px;
  transition: all .2s;
}

.clients-enter, .clients-leave-to {
  max-height: 0;
  margin-top: 0;
  margin-bottom: 0;
  opacity: 0;
}

/* ------ MEDIA-QUERIES  ------ */
@media all and (min-width: $breakpoint__sm) {
  .clients__division { display: block; }
}
</style>
