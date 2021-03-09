<template>
  <div class="top">
    <div class="top__header">
      <span
        class="top__header__icon iconfont"
        @click="handleBackClick"
      >&#xe60c;</span>
      确认订单
    </div>
    <div class="top__receive">
      <div class="top__receive__title">收货地址</div>
      <div class="top__receive__address">哈尔滨工程大学21B</div>
      <div class="top__receive__info">
        <span class="top__receive__info__name">瑶妹（先生）</span>
        <span class="top__receive__info__phone">18911024266</span>
      </div>
      <div
        class="top__receive__icon iconfont"
      >&#xe60c;</div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'TopArea',
  setup () {
    const router = useRouter()
    const handleBackClick = () => { router.back() }
    return { handleBackClick }
  }
}
</script>

<style lang="scss" scoped>
.top {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 1.59rem;
  background-image: linear-gradient(0deg, rgba(0,145,255,0.00) 4%, #0091FF 50%);
  &__header {
    position: relative;
    height: .22rem;
    line-height: .22rem;
    font-size: .16rem;
    color: #fff;
    text-align: center;
    padding-top: .41rem;
    &__icon {
      position: absolute;
      left: .185rem;
      font-size: .22rem;
    }
  }
  &__receive {
    position: absolute;
    height: 1.11rem;
    background: #fff;
    left: .18rem;
    right: .18rem;
    top: .85rem;
    border-radius: .04rem;
    color: #333333;
    &__title {
      font-size: .16rem;
      font-weight: 600;
      margin: .16rem 0 .14rem .16rem;
      line-height: .22rem;
    }
    &__address {
      font-size: .14rem;
      margin: 0 0 .06rem .16rem;
      line-height: .2rem;
    }
    &__info {
      font-size: .12rem;
      color: #666666;
      line-height: .17rem;
      margin-left: .16rem;
      &__phone {
        display: inline-block;
        margin-left: .06rem;
      }
    }
    &__icon {
      position: absolute;
      right: .12rem;
      top: 0;
      line-height: 1.11rem;
      transform: rotate(180deg);
    }
  }
}
</style>
