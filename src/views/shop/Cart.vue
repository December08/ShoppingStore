<template>
  <div
    class="mask"
    v-if="total && showCart"
    @click="handleCartShowChange"
  ></div>
  <div class="cart">
    <div class="product" v-if="total && showCart">
      <div class="product__header">
        <div class="product__header__all">
          <span
            class="product__header__icon iconfont"
            :style="{ color: (allChecked) ? '#0091FF' : '#999' }"
          >&#xe613;</span>
          <span
            class="product__header__content"
            @click="setCartItemsChecked(shopId)"
          >全选</span>
        </div>
        <div
          class="product__header__clear"
        >
          <span
            class="product__header__clear__btn"
            @click="clearAllProducts(shopId)"
          >清空购物车</span>
        </div>
      </div>
      <template
        v-for="item in productList"
        :key="item._id"
      >
        <div class="product__item" >
          <div
            class="product__item__checked iconfont"
            :style="{ color: (item.check) ? '#0091FF' : '#999' }"
            @click="changeItemChecked(shopId, item._id)"
          >&#xe613;</div>
          <img class="product__item__img" :src="item.imgUrl" />
          <div class="product__item__detail">
            <h4 class="product__item__title">{{item.name}}</h4>
            <p class="product__item__price">
              <span class="product__item__current">&yen;</span>{{item.price}}
              <span class="product__item__origin">&yen;{{item.oldPrice}}</span>
            </p>
          </div>
          <div class="product__number">
            <span
              class="product__number__minus iconfont"
              @click="changeItemToCart(shopId, item._id, item, -1)"
            >&#xe638;</span>
            {{ item.count || 0 }}
            <span
              class="product__number__plus iconfont"
              @click="changeItemToCart(shopId, item._id, item, +1)"
            >&#xe600;</span>
          </div>
        </div>
      </template>
    </div>
    <div class="check">
      <div class="check__icon">
        <img
          src="http://www.dell-lee.com/imgs/vue3/basket.png"
          class="check__icon__img"
          @click="handleCartShowChange"
        />
        <div class="check__icon__tag">{{total}}</div>
      </div>
      <div class="check__info">
        总计：<span class="check__info__price">&yen; {{price}}</span>
      </div>
      <div class="check__btn">
        <router-link :to="{ path: `/orderConfirmation/${shopId}` }">
          去结算
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from '../../effects/cartEffects'

const useCartEffect = (shopId) => {
  const {
    changeItemToCart, changeItemChecked, productList,
    clearAllProduct, cartList, setCartItemsChecked, total, price
  } = useCommonCartEffect(shopId)

  // 查看是否全选
  const allChecked = computed(() => {
    const productList = cartList[shopId]?.productList
    for (const key in productList) {
      if (productList[key].count && !productList[key].check) {
        return false
      }
    }
    return true
  })
  // 是否显示购物车列表
  const showCart = ref(false)
  const handleCartShowChange = () => {
    const productList = cartList[shopId]?.productList
    let result = true
    for (const key in productList) {
      if (!productList[key].count) {
        result = false
      }
    }
    if (productList && result) {
      showCart.value = !showCart.value
    }
  }
  // 清空购物车
  const clearAllProducts = (shopId) => {
    clearAllProduct(shopId)
    showCart.value = false
  }
  return { total, price, productList, changeItemToCart, changeItemChecked, clearAllProducts, setCartItemsChecked, allChecked, showCart, handleCartShowChange }
}

export default {
  name: 'Cart',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const {
      total, price, productList, setCartItemsChecked, allChecked,
      changeItemToCart, changeItemChecked, clearAllProducts, handleCartShowChange, showCart
    } = useCartEffect(shopId)
    return {
      total, price, productList, changeItemToCart, shopId, changeItemChecked, clearAllProducts, setCartItemsChecked, allChecked, showCart, handleCartShowChange
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
.mask {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0, 0, 0, .5);
  z-index: 1;
}
.cart {
  z-index: 2;
  position: absolute;
  background: #fff;
  left: 0;
  right: 0;
  bottom: 0;
}
.product {
  background: #fff;
  overflow-y: scroll;
  flex: 1;
  &__header {
    height: .52rem;
    line-height: .52rem;
    border-bottom: 1px solid #F1F1F1;
    display: flex;
    color: #333;
    &__all {
      margin-left: .16rem;
      font-size: .14rem;
    }
    &__icon {
      margin-right: .084rem;
      width: .192rem;
      height: .192rem;
    }
    &__content {
      display: inline-block;
    }
    &__clear {
      flex: 1;
      margin-right: .18rem;
      text-align: right;
      font-size: .14rem;
      &__btn {
        display: inline-block;
      }
    }
  }
  &__item {
    display: flex;
    position: relative;
    padding: .12rem 0;
    margin: 0 .16rem;
    border-bottom: .01rem solid #F1F1F1;
    &__checked {
      height: .192rem;
      width: .192rem;
      line-height: .49rem;
    }
    &__img {
      margin-right: .16rem;
      margin-left: .16rem;
      width: .46rem;
      height: .46rem;
    }
    &__title {
      margin: 0;
      line-height: .2rem;
      font-size: .14rem;
    }
    &__price {
      margin: .06rem 0 0 0;
      font-size: .14rem;
      height: .2rem;
      line-height: .2rem;
      color: #E93B3B;
    }
    &__current {
      font-size: .12rem;
    }
    &__origin {
      display: inline-block;
      font-size: .12rem;
      margin-left: .06rem;
      color: #999999;
      text-decoration: line-through;
    }
    .product__number {
      position: absolute;
      display: flex;
      right: 0rem;
      bottom: .12rem;
      height: .2rem;
      align-items: center;
      font-size: .14rem;
      &__minus, &__plus {
        font-size: .2rem;
      }
      &__minus {
        margin-right: .1rem;
        color: #666;
      }
      &__plus {
        margin-left: .1rem;
        color: #0091FF;
      }
    }
  }
}
.check {
  display: flex;
  height: .49rem;
  border-top: .01rem solid $content-bgColor;
  line-height: .49rem;
  &__icon {
    position: relative;
    width: .84rem;
    &__img {
      display: block;
      margin: .12rem auto;
      width: .28rem;
      height: .26rem;
    }
    &__tag {
      position: absolute;
      right: .19rem;
      top: .02rem;
      width: .25rem;
      height: .25rem;
      line-height: .25rem;
      background-color: $hightlight-fontColor;
      border-radius: 50%;
      font-size: .12rem;
      text-align: center;
      color: #fff;
      transform: scale(.5);
    }
  }
  &__info {
    flex: 1;
    color: $content-fontcolor;
    font-size: .12rem;
    &__price {
      line-height: .49rem;
      color: $hightlight-fontColor;
      font-size: .18rem;
    }
  }
  &__btn {
    width: .98rem;
    background-color: #4FB0F9;
    text-align: center;
    font-size: .14rem;
    a {
      color: #fff;
      text-decoration: none;
    }
  }
}
</style>
