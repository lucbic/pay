<template>
<div class="clients" v-bar>
  <div class="clients__content">
    <div class="label">
      <span class="label__client">
        Cliente
      </span>
      <span class="label__value">
        Valor
      </span>
    </div>
    <client v-for="client in clients" :client="client" :key="`client-${client.id}`"/>
  </div>
</div>
</template>

<script>
import Client from '@/components/Client'

export default {
  name: 'Clients',
  components: { Client },
  props: [ 'clients' ]
}
</script>

<style lang="scss" scoped>
.clients {

}

.label {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;

  font-family: $ff__dosis;
  font-size: 20px;
  font-weight: bold;

  &__client {
    margin-left: 20px;
  }

  &__value {
    margin-right: 20px;
  }
}
</style>
