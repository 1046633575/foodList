import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    num: 0,
    car: []
  },
  mutations: {
    // 购物车的总数 +1
    addNum(state){
      state.num ++
    },
    // 购物车的总数 -1
    reduceNum(state){
      state.num --
    },
    // 添加商品到购物车
    addCar(state, params){
      const id = params.id
      const foodId = Number(params.foodId)
      let car = state.car
      // 根据 id 从数组中找出符合的 索引index
      let index0 = car.findIndex(item => item.id == id)
      // 索引不为 -1，说明存在，修改
      if(index0 !== -1) {
        let item = car[index0]
        // 同上，找到 条件符合的 索引
        let index1 = item.car.findIndex(obj => obj.id == foodId)
        // 索引不为 -1，说明存在，数量+1
        if(index1 !== -1) {
          item.car[index1].num ++
        // 索引为 -1，说明不存在，创建新的对象，num赋值为 1
        }else{
          item.car.push({id: foodId, num: 1})
        }
      // 同上，索引为 -1，说明不存在，创建新的
      }else{
        let item = new Object();
        item.id = id
        item.car = []
        // 根据 foodId 从数组中找出符合的 索引index
        let index1 = item.car.findIndex(obj => obj.id == foodId)
        // 根据索引进行判断，不为 -1，存在，改变数量
        // 索引为 -1，不存在，创建新的
        if(index1 !== -1) {
          item.car[index1].num ++
        }else{
          item.car.push({id: foodId, num: 1})
        }
        // 把新建的对象 push 到数组中
        state.car.push(item)
      }
      // 更新 vuex 的值
      state.car = car 
    }
  },
  actions: {

  }
})
