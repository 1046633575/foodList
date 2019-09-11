<template>
    <div class="container m-t-3">
      <!--card组件-->
      <my-card :restaurant="restaurant"></my-card>
      <!--商品列表-->
      <div class="content m-t-5">
          <div class="items p-b-5 clearFix" v-for="(item,i) in restaurant.formatArr" :key="i">
              <h3 class="text-left p-b-3 fs-llg">{{restaurant.items[i]}}</h3>
              <hr>
              <div class="item border-1 box-shadow m-t-3 b-1 p-b-3" :class="index % 3 == 1 ? 'center' : ''" style="width: 30%;" v-for="(itemList,index) in item" :key="itemList.id">
                  <div class="img p-b-3">
                      <img v-lazy="itemList.img" class="w-100 b-1" style="height: 300px;">
                  </div>
                  <div class="d-flex jc-around ai-center">
                      <div>
                          <div class="p-b-1">{{itemList.name}}</div>
                          <div>￥{{itemList.price}}</div>
                      </div>
                      <div>
                          <el-button type="primary" @click="add(restaurant,itemList.id)">添加到购物车</el-button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'restaurant',
  data () {
    return {
      restaurant: {}
    }
  },
  created () {
    // 获取传入的 id
    this.getQueryId()
    // 获取餐厅数据
    this.getRestaurant()
  },
  methods: {
    // 获取传入的 id
    getQueryId () {
      this.id = this.$route.query.id
    },
    // 获取餐厅数据
    getRestaurant () {
      this.$http.get('/restaurant.json').then((res) => {
        if (res.status === 200) {
          // 调用查找数据方法
          this.findItem(res.data)
        }
      })
    },
    // 查找符合的数据
    findItem (data) {
      // 使用 find 方法找出 id 符合的 项
      const item = data.find((item) => item.id === this.id)
      // 调用格式化数据的方法
      this.formatData(item)
    },
    // 格式化数据
    formatData (data) {
      // 创建空数组用来存格式化后的数据
      var formatArr = []
      // 通过 for 循环遍历分类
      for (var i = 0; i < data.items.length; i++) {
        let arr = []
        // 循环遍历每道菜，判断 每道菜是否属于某分类，如果属于就添加到数组中
        for (let j = 0; j < data.menu.length; j++) {
          let categorys = data.menu[j].category
          // some 判断条件是否满足，有一项满足就返回 true
          let flag = categorys.some(item => item === i)
          if (flag) {
            arr.push(data.menu[j])
          }
        }
        // 将每个分类添加到格式化后的数组中
        formatArr.push(arr)
      }
      data.formatArr = formatArr
      this.restaurant = data
    },
    // 添加到购物车
    add (obj, id) {
      this.$message({
        message: '添加成功',
        type: 'success',
        duration: 2000,
        center: 'true'
      })
      this.$store.commit('addNum')
      this.$store.commit('addCar', { id: obj.id, foodId: id })
    }
  }
}
</script>

<style lang="less" scoped>
  .container{
    width: 1200px;
  }
  .item{
      float: left;
      transition: all .8s;
      &:hover{
          transform: translateY(-10px);
          box-shadow: 0 2px 20px 0 rgba(0,0,0,.5);
      }
      &.center{
          margin-left: 60px;
          margin-right: 60px;
      }
  }
</style>
