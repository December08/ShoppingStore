<template>
  <div class="wrapper">
    <div class="top">
      <div class="top__header">
        <span class="top__header__icon iconfont">&#xe60c;</span>
        确认订单
      </div>
      <div class="top__receive">
        <div class="top__receive__title">收货地址</div>
        <div class="top__receive__address">哈尔滨工程大学21B</div>
        <div class="top__receive__info">
          <span class="top__receive__info__name">瑶妹（先生）</span>
          <span class="top__receive__info__phone">18911024266</span>
        </div>
        <div class="top__receive__icon iconfont">&#xe60c;</div>
      </div>
    </div>
    <div class="products">
      <div class="products__shopname">沃尔玛</div>
      <div class="products__list">
        <img class="products__list__img" src="http://www.dell-lee.com/imgs/vue3/超市.png">
        <div class="products__list__info">
          <h4 class="products__list__name">番茄250</h4>
          <p class="products__list__pricelist">
            <span>
              <span class="products__list__yen">&yen;</span>33 × 3
            </span>
            <span class="products__list__total">
              <span class="products__list__yen">&yen;</span>99.9
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderConfirmation'
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #F5F5F5;
}
.top {
  position: relative;
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
    width: 3.39rem;
    height: 1.11rem;
    background: #fff;
    left: .18rem;
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
.products {
  margin: .53rem .18rem 0 .18rem;
  width: 3.39rem;
  background: #fff;
  border-radius: .04rem;
  &__shopname {
    line-height: .54rem;
    font-size: .16rem;
    font-weight: 600;
    color: #333;
    margin-left: .16rem;
  }
  &__list {
    display: flex;
    padding: 0 .16rem .16rem .16rem;
    &__img {
      width: .46rem;
      height: .46rem;
      margin-right: .16rem;
    }
    &__info {
      flex: 1;
    }
    &__name {
      font-size: .14rem;
      color: #333333;
      line-height: .2rem;
      margin: 0rem;
    }
    &__pricelist {
      display: flex;
      font-size: .14rem;
      line-height: .2rem;
      margin: .06rem 0 0 0;
      color: #E93B3B;
    }
    &__yen {
      font-size: .12rem;
    }
    &__total {
      flex: 1;
      text-align: right;
      color: #000;
    }
  }
}
</style>
