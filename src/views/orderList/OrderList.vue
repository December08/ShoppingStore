<template>
  <h4 class="top">我的订单</h4>
  <div class="order">
    <div
      class="list"
      v-for="(item, index) in list"
      :key="index"
    >
      <div class="list__top">
        <span class="list__top__shopname">{{item.shopName}}</span>
        <span class="list__top__status">{{item.isCanceled ? '已取消' : '已下单'}}</span>
      </div>
      <div class="list__detail">
        <div
          class="list__detail__imgs"
          v-for="(innerItem, innerIndex) in item.products"
          :key="innerIndex"
        >
          <img class="list__detail__img" :src="innerItem.product.img" v-if="innerIndex <= 3">
        </div>
        <div class="list__detail__info">
          <div class="list__detail__price">&yen;{{item.totalPrice.toFixed(2)}}</div>
          <div class="list__detail__count">共{{item.totalNumber}}件</div>
        </div>
      </div>
    </div>
  </div>
  <navigation :currentIndex="2"/>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { get } from '../../utils/request'
import Navigation from '../../components/Navigation'

// 处理订单列表逻辑
const useOrderListEffect = () => {
  const data = reactive({ list: [] })
  const getNearbyList = async () => {
    const result = await get('/api/order')
    if (result?.errno === 0 && result?.data?.length) {
      const orderList = result.data
      orderList.forEach((order) => {
        const products = order.products || []
        let totalPrice = 0
        let totalNumber = 0
        products.forEach((productItem) => {
          totalNumber += (productItem?.orderSales || 0)
          totalPrice += ((productItem?.product?.price * productItem?.orderSales) || 0)
        })
        order.totalPrice = totalPrice
        order.totalNumber = totalNumber
      })
      data.list = result.data
    }
  }
  getNearbyList()
  console.log(data)
  const { list } = toRefs(data)
  return { list }
}

export default {
  name: 'OrderList',
  components: { Navigation },
  setup () {
    const { list } = useOrderListEffect()
    return { list }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  background: #F5F5F5;
  left: 0;
  top: 0;
  bottom: 0.5rem;
  right: 0;
  overflow-y: auto;
}
.top {
  height: .44rem;
  line-height: .44rem;
  margin: 0;
  text-align: center;
  font-size: .16rem;
  background: #fff;
}
.order {
  position: absolute;
  top: .44rem;
  left: 0;
  right: 0;
  bottom: .49rem;
  background: #F5F5F5;
  overflow-y: scroll;
}
.list {
  position: relative;
  margin: .16rem .18rem;
  background: #fff;
  height: 1.10rem;
  border-radius: .04rem;
  &__top {
    display: flex;
    padding: .16rem .16rem;
    height: .22rem;
    &__shopname {
      font-size: .16rem;
      font-weight: 550;
      line-height: .22rem;
      color: #333;
    }
    &__status {
      flex: 1;
      font-size: .14rem;
      line-height: .22rem;
      text-align: right;
      color: #999;
    }
  }
  &__detail {
    display: flex;
    margin: 0 .16rem .16rem .16rem;
    &__img {
      width: .4rem;
      height: .4rem;
      margin-right: .12rem;
    }
    &__info {
      flex: 1;
      text-align: right;
    }
    &__price {
      font-size: .14rem;
      color: #E93B3B;
    }
    &__count {
      font-size: .12rem;
      color: #333;
      margin-top: .04rem;
    }
  }
}
</style>
