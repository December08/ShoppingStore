<template>
  <div class="bottom">
    <div class="bottom__payment">
      实付金额
      <span class="bottom__payment__total">&yen;{{price}}</span>
    </div>
    <div
      class="bottom__commit"
      @click="handleSubmitClick(true)"
    >提交订单</div>
  </div>
  <div
    class="mask"
    v-show="showPayment"
    @click="handleSubmitClick(false)"
  >
    <div class="mask__content" @click.stop>
      <h4 class="mask__content__title">确认要离开收银台？</h4>
      <div class="mask__content__desc">请尽快完成支付，否则将被取消</div>
      <div class="mask__content__btn">
        <span
          class="mask__content__cancel"
          @click="handleOrderClick(true)"
        >取消订单</span>
        <span
          class="mask__content__confirm"
          @click="handleOrderClick(false)"
        >确认支付</span>
      </div>
    </div>
  </div>
  <Toast v-if="toastData.showToast" :message="toastData.toastMessage" />
</template>

<script>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { post } from '../../utils/request'
import { useCommonCartEffect } from '../../effects/cartEffects'
import Toast, { useToastEffect } from '../../components/Toast'

// 下单相关逻辑
const useMakeOrderEffect = (productList, shopName, shopId, showToast) => {
  const router = useRouter()
  const store = useStore()
  const handleOrderClick = async (isCanceled) => {
    const products = []
    for (const i in productList.value) {
      const product = productList.value[i]
      products.push({ id: parseInt(product._id, 10), num: product.count })
    }
    try {
      const result = await post('/api/order', {
        addressId: 1,
        shopId,
        shopName: shopName.value,
        isCanceled,
        products
      })
      if (result.errno === 0) {
        store.commit('clearCartData', shopId)
        router.push({ name: 'Home' })
      } else {
        showToast('下单失败')
      }
    } catch (e) {
      showToast('下单失败')
    }
  }
  return { handleOrderClick }
}

// 提交订单展示逻辑
const useShowMaskEffect = () => {
  const showPayment = ref(false)
  const handleSubmitClick = (isShow) => {
    showPayment.value = isShow
  }
  return { showPayment, handleSubmitClick }
}

export default {
  name: 'Order',
  components: {
    Toast
  },
  setup () {
    const route = useRoute()

    const shopId = parseInt(route.params.id, 10)
    const { price, productList, shopName } = useCommonCartEffect(shopId)
    const { toastData, showToast } = useToastEffect()
    const { handleOrderClick } = useMakeOrderEffect(productList, shopName, shopId, showToast)
    const { showPayment, handleSubmitClick } = useShowMaskEffect()
    return { price, showPayment, handleSubmitClick, handleOrderClick, toastData, showToast }
  }
}
</script>

<style lang="scss" scoped>
.bottom {
  position: fixed;
  display: flex;
  height: .49rem;
  line-height: .49rem;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  &__payment {
    flex: 1;
    font-size: .14rem;
    margin-left: .24rem;
    &__total {
      font-weight: 550;
    }
  }
  &__commit {
    height: .49rem;
    width: .98rem;
    background: #4FB0F9;
    text-align: center;
    color: #fff;
    font-size: .14rem;
    right: 0;
  }
}
.mask {
  z-index: 1;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0,0,0,0.50);
  &__content {
    position: relative;
    margin: 0 .37rem;
    height: 1.57rem;
    background: #fff;
    border-radius: .04rem;
    top: 50%;
    transform: translate(0, -50%);
    text-align: center;
    &__title {
      position: absolute;
      font-size: .18rem;
      margin: 0;
      top: .24rem;
      width: 100%;
    }
    &__desc {
      position: absolute;
      font-size: .14rem;
      top: .57rem;
      width: 100%;
    }
    &__btn {
      position: absolute;
      font-size: .14rem;
      top: 1.01rem;
      width: 100%;
    }
    &__cancel {
      display: inline-block;
      width: .8rem;
      height: .32rem;
      line-height: .30rem;
      border: .01rem solid #4FB0F9;
      border-radius: .16rem;
      margin-right: .24rem;
      color: #4FB0F9;
    }
    &__confirm {
      display: inline-block;
      width: .8rem;
      height: .32rem;
      border-radius: .16rem;
      line-height: .30rem;
      border: 1px solid #4FB0F9;
      background: #4FB0F9;
      color: #fff;
    }
  }
}
</style>
