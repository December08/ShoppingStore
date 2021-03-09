import { createStore } from 'vuex'

// 存储state数据到localhost中
const setLocalCartList = (state) => {
  const { cartList } = state
  const cartListString = JSON.stringify(cartList)
  localStorage.cartList = cartListString
}
// 从localhost中提取数据
const getLocalCartList = () => {
  /**
   * shopId { -- 商铺Id
   *   shopName: -- 商铺名字
   *   productList { -- 商铺商品列表
   *     productId {
   *       -- 商品信息
   *     }
   *   }
   * }
   */
  return localStorage.getItem('cartList') ? JSON.parse(localStorage.cartList) : {}
}

export default createStore({
  state: {
    cartList: getLocalCartList()
  },
  mutations: {
    changeItemToCart (state, payload) {
      const { shopId, productId, productInfo, shopName } = payload
      const shopInfo = state.cartList[shopId] || {
        shopName: '', productList: {}
      }
      shopInfo.shopName = shopName
      let product = shopInfo.productList[productId]
      if (!product) {
        product = productInfo
        product.count = 0
        product.check = true
      }
      product.count += payload.num
      if (product.count < 0) { product.count = 0 }
      shopInfo.productList[productId] = product
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    },
    changeItemChecked (state, payload) {
      const { shopId, productId } = payload
      const product = state.cartList[shopId].productList[productId]
      product.check = !product.check
      setLocalCartList(state)
    },
    clearAllProduct (state, payload) {
      state.cartList[payload.shopId].productList = {}
      setLocalCartList(state)
    },
    setCartItemsChecked (state, payload) {
      const products = state.cartList[payload.shopId].productList
      for (const key in products) {
        products[key].check = true
      }
      setLocalCartList(state)
    },
    // 清空购物车
    clearCartData (state, shopId) {
      state.cartList[shopId].productList = {}
    }
  },
  actions: {
  },
  modules: {
  }
})
