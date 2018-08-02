<template>
<div class="logo">
  <img class="logo__image" src="/static/img/burguer-logo.jpg" alt="logo">
  <h1 class="logo__title">Hamburgueria</h1>
</div>
</template>

<script>
export default {
  name: 'Logo'
}
</script>

<style lang="scss" scoped>

.logo {
  background: white;
  padding: 4px 10px;
  border-radius: 15px;
  border: 6px double $darkest-grey;
  width: fit-content;

  &__image {
    display: block;
    margin: 0 auto;
    width: 70px;
  }

  &__title {
    text-transform: uppercase;
    font-family: $ff__roboto;
    font-size: 20px;
    color: $darkest-grey;
    margin: 0;
  }
}
</style>
