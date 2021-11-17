import {
  ADD_COUNTER,
  ADD_TO_CAR
} from './mutation-types'
export default {
  //mutations的唯一目的：辅助修改state中属性的状态
  //mutations中的每个方法尽可能完成的事件比较单一
  [ADD_COUNTER](state,payload){
    payload.count++
  },
  [ADD_TO_CAR](state,payload){
    state.cartList.push(payload);
  }
}
