import { useStore } from 'vuex'

// 购物车相关逻辑
export const useCommonCartEffect = () => {
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
  return { changeItemToCart, changeItemChecked, clearAllProduct, cartList, setCartItemsChecked }
}
