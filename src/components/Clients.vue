<template>
<div class="clients" @click="desselect($event)">

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
      <client v-for="client in tableClients"
              :client="client" :key="`client-${tableClients.indexOf(client)}`"/>
      <add-client />
    </div>
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
    ...mapState(['activeClient']),
    ...mapGetters(['tableClients'])
  },
  methods: {
    ...mapActions(['setActiveClient']),

    desselect (event) {
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
</style>
