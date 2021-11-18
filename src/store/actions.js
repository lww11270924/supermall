import {
  ADD_COUNTER,
  ADD_TO_CAR
} from './mutation-types'
export default {
  addCart(context,payload){
    return new Promise((resolve,reject) => {
      // let oldProduct = state.cartList.find(item => {
      //   return item.iid === payload.iid;
      // })
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      //2判断oldProduct
      if(oldProduct){
        // oldProduct.count +=1;
        context.commit(ADD_COUNTER,oldProduct)
        resolve('当前的商品数量+1')
      }else{
        payload.count = 1;
        // state.cartList.push(payload);
        context.commit(ADD_TO_CAR,payload)
        resolve('添加了新的商品')
      }
    })
  }
}
