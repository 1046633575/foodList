<template>
    <div class="container m-t-3">
        <el-card class="m-t-5" v-show="flag" style="width: 1200px;">
            <div style="color: #409EFF;">购物车里什么都没有</div>
        </el-card>
        <el-card class="m-b-5" v-for="(item,i) in formatRestaurants" :key="item.obj.id">
            <my-card :restaurant="item.obj"></my-card>
            <el-card class="m-t-3">
                <el-table
                    :data="item.cars"
                    style="width: 100%">
                    <el-table-column
                        label="商品图片"
                        width="250">
                        <template slot-scope="scope">
                            <img class="b-1" :src="scope.row.obj.img" width="200px" height="150px"/>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="obj.name"
                        label="商品名称"
                        width="250">
                    </el-table-column>
                    <el-table-column
                        width="250"
                        prop="obj.price"
                        label="商品价格">
                    </el-table-column>
                    <el-table-column
                        prop="num"
                        label="商品数量">
                        <template slot-scope="scope">
                            <div class="number d-flex jc-center">
                                <i class="el-icon-minus" @click="reduceData(i,scope.row.obj.id,scope.row.num)"></i>
                                <span>{{scope.row.num}}</span>
                                <i class="el-icon-plus" @click="addData(i,scope.row.obj.id,scope.row.num)"></i>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
            <el-card class="m-t-3">
                <div class="d-flex jc-around ai-center">
                    <div>总数：{{total[i].num}}</div>
                    <div>原价：<del>￥{{total[i].total}}</del></div>
                    <div>折扣价：<span style="color: #F56C6C;">￥{{(total[i].total * 0.9).toFixed(2)}}</span></div>
                    <div><el-button type="primary" plain @click="goBuy(i)">去付款</el-button></div>
                </div>
            </el-card>
        </el-card>
    </div>
</template>

<script>
export default {
  name: 'car',
  data () {
    return {
      restaurants: [],
      formatRestaurants: [],
      total: [],
      flag: false
    }
  },
  created () {
    // 获取餐厅数据 并格式化
    this.getRestaurant()
  },
  methods: {
    // 获取餐厅数据
    getRestaurant () {
      this.$http.get('/restaurant.json').then((res) => {
        if (res.status === 200) {
          this.restaurants = res.data
          // 格式化 vuex 购物车数据
          this.formatCarData()
        }
      })
    },
    // 格式化 vuex 中的购物车数据
    formatCarData () {
      // 获取 vuex 购物车数据
      const carData = this.$store.state.car
      // 获取 餐厅数据
      const restaurants = this.restaurants
      // 创建空数组
      let arr = []
      // 遍历 carData
      for (let item of carData) {
        // 创建一个新对象
        let itemObj = {}
        // 找到满足条件的对象
        let obj = restaurants.find(obj => obj.id === item.id)
        itemObj.obj = obj
        itemObj.cars = []
        // 循环找到满足条件的对象加入数组
        for (let food of item.car) {
          let children = {}
          let obj = itemObj.obj.menu.find(obj => Number(obj.id) === Number(food.id))
          children.obj = obj
          children.num = food.num
          itemObj.cars.push(children)
        }
        arr.push(itemObj)
      }
      // 赋值 格式化后的数据
      // 数据结构：[[cars:[[obj:obj,num:2],[obj:obj,num:2]],obj:obj]
      this.formatRestaurants = arr
      // 计算总价
      this.computeTotal(this.formatRestaurants)
    },
    // 计算商品总价
    computeTotal (arr) {
      let num = 0
      let total = 0
      const newArr = []
      // 循环计算商品总数及总价
      for (let i in arr) {
        num = 0
        total = 0
        for (let k of arr[i].cars) {
          num += k.num
          total += k.num * k.obj.price
        }
        const obj = {}
        obj.num = num
        obj.total = total
        newArr.push(obj)
      }
      this.total = newArr
    },
    // 减少购物车中商品数量
    reduceData (index, id, num) {
      // 先判断这个商品的数量，如果等于 1 了，就直接返回，最小值为 1
      if (num === 1) return
      // 商品总数减少
      this.$store.commit('reduceNum')
      const arr = this.formatRestaurants
      // 找到符合条件的索引
      const newIndex = arr[index].cars.findIndex(item => item.obj.id === id)
      // 根据索引找到对象的 num 并修改
      arr[index].cars[newIndex].num--
      this.formatRestaurants = arr
      // 同步 vuex 中的数据
      this.$store.commit('addItem', { index: index, i: newIndex })
      // 计算总价
      this.computeTotal(this.formatRestaurants)
    },
    // 增加购物车中商品数量
    addData (index, id, num) {
      // 商品总数增加
      this.$store.commit('addNum')
      const arr = this.formatRestaurants
      // 找到符合条件的索引
      const newIndex = arr[index].cars.findIndex(item => item.obj.id === id)
      // 根据索引找到对象的 num 并修改
      arr[index].cars[newIndex].num++
      this.formatRestaurants = arr
      // 同步 vuex 中的数据
      this.$store.commit('addItem', { index: index, i: newIndex })
      // 计算总价
      this.computeTotal(this.formatRestaurants)
    },
    // 付款功能 使用 localStorage
    goBuy (index) {
      // 先判断本地有没有 订单数组
      // 有就使用 订单数组
      const arr = JSON.parse(localStorage.getItem('order'))
      var newArr
      if (arr) {
        newArr = arr
      } else {
        newArr = []
      }
      const orderItem = this.formatRestaurants[index]
      orderItem.num = this.total[index].num
      orderItem.total = this.total[index].total
      // 获取格式化时间
      orderItem.date = this.getDate()
      // 新建的订单项 push 进数组
      newArr.push(orderItem)
      // 更新订单数组
      localStorage.setItem('order', JSON.stringify(newArr))
      // 删除 购物车中的项
      this.formatRestaurants.splice(index, 1)
      // 删除 vuex购物车中的项
      this.$store.commit('deleteCar', index)
      // 改变购物车总数
      this.$store.commit('buyNum', this.total[index].num)
      // 弹框提醒
      this.$notify({
        title: '购买成功',
        type: 'success'
      })
      // 跳转至订单页面
      this.$router.push('order')
    },
    // 创建格式化时间的方法 2020-01-01
    getDate () {
      let dt = new Date()
      // 获取年
      let year = dt.getFullYear()
      // 获取月
      let month = dt.getMonth() + 1// 从0开始的  +1变成正常月份
      // 获取日
      let day = dt.getDate()
      // 获取小时
      let hour = dt.getHours()
      // 获取分钟
      let minute = dt.getMinutes()
      // 获取秒
      let second = dt.getSeconds()
      // 如果数值小于10 加0
      month = month < 10 ? '0' + month : month
      day = day < 10 ? '0' + day : day
      hour = hour < 10 ? '0' + hour : hour
      minute = minute < 10 ? '0' + minute : minute
      second = second < 10 ? '0' + second : second
      return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
    }
  },
  watch: {
    formatRestaurants: function () {
      if (this.formatRestaurants.length === 0) {
        this.flag = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .number{
    width: 180px;
    height: 41px;
    text-align: center;
    line-height: 40px;
    span{
        width: 100px;
        height: 40px;
        border-top: 1px solid #dcdfe6;
        border-bottom: 1px solid #dcdfe6;
    }
    i {
      width: 40px;
      height: 40px;
      line-height: 40px;
      border: 1px solid #dcdfe6;
      background-color: #F5F7FA;
      &:hover{
        background: #ccc;
      }
    }
  }
</style>
