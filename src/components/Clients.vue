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
      <client v-for="client in clients" :client="client" :key="`client-${client.id}`"/>
      <add-client />
    </div>
  </div>

  <div class="clients__spacer">

  </div>

</div>
</template>

<script>
import Client from '@/components/Client'
import AddClient from '@/components/AddClient'

export default {
  name: 'Clients',
  components: {
    Client,
    AddClient
  },
  props: [ 'clients' ],
    desselect (event) {
      if (event.target.closest('#client-component')) { return }
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

  &__spacer {
    height: 10px;
  }
}

.label {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;

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
