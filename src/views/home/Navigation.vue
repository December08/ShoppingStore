<template>
  <div class="navigation">
    <div
      v-for="(item, index) in dockerList"
      :class="{'navigation__item': true, 'navigation__item--active': index === 0}"
      :key="item.icon"
    >
      <div class="iconfont" v-html="item.icon"></div>
      <div class="navigation__title">{{item.text}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
  setup () {
    const dockerList = [
      { icon: '&#xec0b;', text: '首页' },
      { icon: '&#xe60e;', text: '购物车' },
      { icon: '&#xe60f;', text: '订单' },
      { icon: '&#xe67b;', text: '我的' }
    ]
    return { dockerList }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
.navigation {
  position: absolute;
  display: flex;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.49rem;
  border-top: 0.01rem solid #f1f1f1;
  color: $content-fontcolor;
  &__item {
    flex: 1;
    text-align: center;
    .iconfont {
      margin: 0.07rem 0 0.02rem 0;
      font-size: 0.18rem;
    }
    &--active {
      color: #1fa4fc;
    }
  }
  &__title {
    font-size: 0.1rem;
  }
}
</style>
