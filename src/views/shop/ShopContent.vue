<template>
  <div class="content">
    <div class="category">
      <div
        :class="{'category__item': true, 'category__item--active': currentTab === item.tab}"
        v-for="item in categories"
        :key="item.name"
        @click="() => handleTabClick(item.tab)"
      >{{item.name}}</div>
    </div>
    <div class="product">
      <div
        class="product__item"
        v-for="item in list"
        :key="item._id"
      >
        <img class="product__item__img" :src="item.imgUrl" />
        <div class="product__item__detail">
          <h4 class="product__item__title">{{item.name}}</h4>
          <p class="product__item__sales">月售{{item.sales}}件</p>
          <p class="product__item__price">
            <span class="product__item__current">&yen;</span>{{item.price}}
            <span class="product__item__origin">&yen;{{item.oldPrice}}</span>
          </p>
        </div>
        <div class="product__number">
          <span
            class="product__number__minus iconfont"
            @click="changeItemToCart(shopId, item._id, item, -1, shopName)"
          >&#xe638;</span>
          {{ cartList?.[shopId]?.productList?.[item._id]?.count || 0 }}
          <span
            class="product__number__plus iconfont"
            @click="changeItemToCart(shopId, item._id, item, +1, shopName)"
          >&#xe600;</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { get } from '../../utils/request'
import { useCommonCartEffect } from './commonCartEffect'

const categories = [
  { name: '全部商品', tab: 'all' },
  { name: '秒杀', tab: 'seckill' },
  { name: '新鲜水果', tab: 'fruit' }
]

// Tab切换相关逻辑
const useTabEffect = () => {
  const currentTab = ref(categories[0].tab)
  const handleTabClick = (tab) => {
    currentTab.value = tab
  }
  return { currentTab, handleTabClick }
}

// 列表内容相关逻辑
const useCurrentListEffect = (currentTab, shopId) => {
  const content = reactive({ list: [] })
  const getContentData = async () => {
    const result = await get(`/api/shop/${shopId}/products`, { tab: currentTab.value })
    if (result?.errno === 0 && result.data) {
      content.list = result.data
    }
  }
  watchEffect(() => { getContentData() })
  const { list } = toRefs(content)
  return list
}

export default {
  name: 'ShopContent',
  props: ['shopName'],
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { currentTab, handleTabClick } = useTabEffect()
    const list = useCurrentListEffect(currentTab, shopId)
    const { changeItemToCart, cartList } = useCommonCartEffect()
    return { categories, currentTab, handleTabClick, list, shopId, changeItemToCart, cartList }
  }
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  top: 1.5rem;
  bottom: .5rem;
}
.category {
  width: .76rem;
  overflow-y: scroll;
  background: #F5F5F5;
  &__item {
    font-size: .14rem;
    line-height: .4rem;
    text-align: center;
    color: #333333;
    &--active {
      background: #FFFFFF;
    }
  }
}
.product {
  overflow-y: scroll;
  flex: 1;
  &__item {
    display: flex;
    position: relative;
    padding: .12rem 0;
    margin: 0 .16rem;
    border-bottom: .01rem solid #F1F1F1;
    &__img {
      margin-right: .16rem;
      width: .68rem;
      height: .68rem;
    }
    &__title {
      margin: 0;
      line-height: .2rem;
      font-size: .14rem;
    }
    &__sales {
      margin: .06rem 0;
      line-height: .16rem;
      font-size: .12rem;
      color: #333333;
    }
    &__price {
      margin: 0;
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
</style>
