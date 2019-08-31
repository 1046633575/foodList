<template>
    <div class="container m-t-3">
        <el-card class="m-b-5" v-for="item in formatRestaurants" :key="item.obj.id">
            <my-card :restaurant="item.obj"></my-card>
            <el-card class="m-t-3">
                <el-table
                    :data="item.cars"
                    style="width: 100%">
                    <el-table-column
                        label="商品图片"
                        width="250">
                        <template slot-scope="scope">
                            <img :src="scope.row.obj.img" width="200px" height="150px"/>
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
                    </el-table-column>
                </el-table>
            </el-card>
        </el-card>
    </div>
</template>

<script>
export default {
  data() {
    return {
      restaurants: [],
      formatRestaurants: []
    }
  },
  created() {
    // 获取餐厅数据 并格式化
    this.getRestaurant()
  },
  methods: {
    // 获取餐厅数据
    getRestaurant () {
      this.$http.get('/restaurant').then((res) => {
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
      for(let item of carData) {
        // 创建一个新对象
        let itemObj = new Object()
        // 找到满足条件的对象
        let obj = restaurants.find(obj => obj.id === item.id)
        itemObj.obj = obj
        itemObj.cars = []
        // 循环找到满足条件的对象加入数组
        for(let food of item.car) {
          let children = new Object()
          let obj = itemObj.obj.menu.find(obj => obj.id == food.id)
          children.obj = obj
          children.num = food.num
          itemObj.cars.push(children)
        }
        arr.push(itemObj)
      }
      // 赋值 格式化后的数据
      // 数据结构：[[cars:[[obj:obj,num:2],[obj:obj,num:2]],obj:obj]
      this.formatRestaurants = arr
    }
  }
}
</script>

<style lang="less" scoped>

</style>