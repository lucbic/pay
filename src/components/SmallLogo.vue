<template>
<div class="small-logo">
  <h1 class="small-logo__title">Hamburgueria</h1>
</div>
</template>

<script>
export default {
  name: 'SmallLogo'
}
</script>

<style lang="scss" scoped>

.small-logo {
  background: white;
  padding: 2px 6px;
  border-radius: 8px;
  border: 4px double $darkest-grey;
  width: fit-content;

  &__title {
    text-transform: uppercase;
    font-family: $ff__roboto;
    font-size: 16px;
    color: $darkest-grey;
    margin: 0;
  }
}

@media all and (max-width: 350px) {
  .small-logo__title {
    font-size: 12px;
    line-height: 1.2;
  }
}
</style>
