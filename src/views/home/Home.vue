<template>
  <div class="wrapper">
    <static-part/>
    <nearby/>
  </div>
  <navigation :currentIndex="0"/>
</template>

<script>
import Navigation from '../../components/Navigation'
import Nearby from './Nearby.vue'
import StaticPart from './StaticPart.vue'
export default {
  name: 'Home',
  components: {
    StaticPart,
    Nearby,
    Navigation
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0.5rem;
  right: 0;
  padding: 0 0.18rem;
  overflow-y: auto;
}
</style>
