<template>
  <div class="wrapper">
    <div class="top">
      <div class="top__back iconfont" @click="handleBackClick">&#xe60c;</div>
      <div class="top__search">
        <span class="top__search__icon iconfont">&#xe69a;</span>
        <input
          class="top__search__input"
          placeholder="请输入商品名称搜索"
        >
      </div>
    </div>
    <shop-info :item="data.item" :hideBorder="true" v-show="data.item.imgUrl"></shop-info>
    <shop-content></shop-content>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { get } from '../../utils/request'
import ShopInfo from '../../components/ShopInfo'
import ShopContent from './ShopContent'

// 获取当前商铺信息
const useShopInfoEffect = () => {
  const route = useRoute()
  const data = reactive({ item: {} })
  const getItemData = async () => {
    const result = await get(`/api/shop/${route.params.id}`)
    if (result?.errno === 0 && result?.data) {
      data.item = result.data
    }
  }
  return { data, getItemData }
}

// 点击回退逻辑
const useBackRouterEffect = () => {
  const router = useRouter()
  const handleBackClick = () => {
    router.back()
  }
  return handleBackClick
}

export default {
  name: 'Shop',
  components: { ShopInfo, ShopContent },
  setup () {
    const { data, getItemData } = useShopInfoEffect()
    const handleBackClick = useBackRouterEffect()
    getItemData()
    return { data, handleBackClick }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 0 0.18rem;
}
.top {
  display: flex;
  margin: .16rem 0 .04rem 0;
  height: .32rem;
  line-height: .32rem;
  &__back {
    width: .3rem;
    font-size: .24rem;
    color: #B6B6B6;
  }
  &__search {
    display: flex;
    flex: 1;
    background: #F5F5F5;
    border-radius: .16rem;
    &__icon {
      width: .44rem;
      text-align: center;
      color: #B7B7B7;
    }
    &__input {
      width: 100%;
      border: none;
      outline: none;
      background: none;
      font-size: .14rem;
      color: #333333;
    }
  }
}
</style>
