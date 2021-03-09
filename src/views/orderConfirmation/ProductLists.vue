<template>
  <div class="products">
    <div class="products__shopname">{{shopName}}</div>
    <div class="products__wrapper">
      <div
        class="products__list"
        v-for="item in productList"
        :key="item._id"
      >
        <img class="products__list__img" :src="item.imgUrl" />
        <div class="products__list__info">
          <h4 class="products__list__name">{{item.name}}</h4>
          <p class="products__list__pricelist">
            <span>
              <span class="products__list__yen">&yen;</span>{{item.price}} × {{item.count}}
            </span>
            <span class="products__list__total">
              <span class="products__list__yen">&yen;</span>{{(item.price*item.count).toFixed(2)}}
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from '../../effects/cartEffects'

export default {
  name: 'ProductLists',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { shopName, productList } = useCommonCartEffect(shopId)
    return { shopName, productList }
  }
}
</script>

<style lang="scss" scoped>
.products {
  margin: 2.12rem .18rem 0 .18rem;
  background: #fff;
  border-top-right-radius: .04rem;
  border-top-left-radius: .04rem;
  &__shopname {
    line-height: .54rem;
    font-size: .16rem;
    font-weight: 600;
    color: #333;
    margin-left: .16rem;
  }
  &__wrapper {
    overflow-y: scroll;
    margin: 0 .18rem;
    position: absolute;
    background: #fff;
    top: 2.63rem;
    left: 0;
    right: 0;
    bottom: .80rem;
  }
  &__list {
    display: flex;
    padding: 0 .16rem .16rem .16rem;
    background: #fff;
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
  &__show {
    color: #999999;
    height: .28rem;
    line-height: .28rem;
    font-size: .14rem;
    background: #F5F5F5;
    text-align: center;
    margin: 0 .16rem;
    &__icon {
      display: inline-block;
      transform: rotate(270deg);
      font-size: .12rem;
    }
  }
  &__bottom {
    position: absolute;
    height: .16rem;
    bottom: .65rem;
    margin: 0 .18rem;
    left: 0;
    right: 0;
    background: #fff;
    border-bottom-left-radius: .04rem;
    border-bottom-right-radius: .04rem;
  }
}
</style>
