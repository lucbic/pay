<template>
<div class="clients">
  <div class="well">
    
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { eventBus } from '@/main'

export default {
  name: 'Clients',
  components: {
  },
  computed: {
    ...mapGetters(['getClients', 'getTable'])
  },
  created () {
    eventBus.$on('selectTable', index => {
      console.log('You have selected the table ' + (index + 1))
      this.table = this.getTable(index)
      this.clients = this.getClients(this.table.clients)
    })
  },
  data () {
    return {
      table: null,
      clients: null
    }
  }
}
</script>

<style lang="scss" scoped>
.clients {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
}

.well__title {
  text-align: center;
  font-family: $ff__dosis;
  font-size: $fs__h1;
  margin: 0;
  margin-top: $size__tables-gap;
}

.well {
  margin: $size__well-margin;
  margin-top: 10px;
  background: $color__well;
  border: 2px solid $color__border-default;
  box-shadow: 6px 6px 10px 0px rgba(0,0,0,0.23);
  border-radius: $br__default;
  flex: 1;

  display: flex;
  flex-direction: column;

  hr {
    width: 60%;
    align-self: center;
    margin: 20px 0;
    border: 0.5px solid $color__border-default;
    padding-left: $size__tables-gap;
    padding-right: $size__tables-gap;
  }
}
</style>
