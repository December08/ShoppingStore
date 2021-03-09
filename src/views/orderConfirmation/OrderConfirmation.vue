<template>
  <div class="wrapper">
    <TopArea />
    <ProductLists />
    <Order />
  </div>
</template>

<script>
import TopArea from './TopArea'
import ProductLists from './ProductLists'
import Order from './Order'

export default {
  name: 'OrderConfirmation',
  components: { TopArea, ProductLists, Order }
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  background: #F5F5F5;
}
</style>
