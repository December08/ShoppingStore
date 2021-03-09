import { computed } from 'vue'
import { useStore } from 'vuex'

// 购物车相关逻辑
export const useCommonCartEffect = (shopId) => {
  const store = useStore()
  const cartList = store.state.cartList
  const changeItemToCart = (shopId, productId, productInfo, num, shopName) => {
    store.commit('changeItemToCart', {
      shopId, productId, productInfo, num, shopName
    })
  }
  const changeItemChecked = (shopId, productId) => {
    store.commit('changeItemChecked', {
      shopId, productId
    })
  }
  const clearAllProduct = (shopId) => {
    store.commit('clearAllProduct', {
      shopId
    })
  }
  // 全选
  const setCartItemsChecked = (shopId) => {
    store.commit('setCartItemsChecked', {
      shopId
    })
  }
  // 获取购物车列表信息
  const productList = computed(() => {
    const productList = cartList[shopId]?.productList || {}
    const notEmptyProductList = {}
    for (const i in productList) {
      if (productList[i].count > 0) {
        notEmptyProductList[i] = productList[i]
      }
    }
    return notEmptyProductList
  })

  // 获取商铺名字
  const shopName = computed(() => {
    const shopName = cartList[shopId]?.shopName || ''
    return shopName
  })

  // 计算总量
  const total = computed(() => {
    const productList = cartList[shopId]?.productList
    let count = 0
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        count += product.count
      }
    }
    if (count > 99) {
      count = '99+'
    }
    return count
  })

  // 计算总价
  const price = computed(() => {
    const productList = cartList[shopId]?.productList
    let price = 0
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        if (product.check) {
          price += product.count * product.price
        }
      }
    }
    return price.toFixed(2)
  })

  // 计算购物车商品种类
  const amount = computed(() => {
    const productList = cartList[shopId]?.productList
    let num = 0
    if (productList) {
      for (const i in productList) {
        if (productList[i].count) {
          num++
        }
      }
    }
    return num
  })

  return {
    changeItemToCart,
    changeItemChecked,
    clearAllProduct,
    cartList,
    setCartItemsChecked,
    productList,
    shopName,
    total,
    price,
    amount
  }
}
