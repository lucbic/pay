<template>
<div class="client">
  <span>
    {{ client.name }}
  </span>
  <span>
    {{ client.total }}
  </span>
</div>
</template>

<script>
export default {
  name: 'Client',
  props: [ 'client' ]
}
</script>

<style lang="scss" scoped>
.client {
  background: $color__dark-grey;
  display: flex;
  justify-content: space-between;
  padding: 6px 10px;
  margin: 5px;
  color: $color__header-text;
  font-family: $ff__dosis;
  font-size: 20px;
  border-radius: 10px;
}
</style>
