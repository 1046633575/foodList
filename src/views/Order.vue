<template>
    <div class="container">
        <el-card class="m-t-5" v-show="flag" style="width: 1200px;">
            <div style="color: #409EFF;">订单列表是空的，快去下单吧</div>
        </el-card>
        <el-card class="m-t-5" v-for="(item,i) in orders" :key="i">
            <el-collapse>
                <el-collapse-item >
                    <template slot="title" style="height: 200px;">
                        <div class="w-100 d-flex ai-center jc-around">
                            <div>商家名称：{{item.obj.name}}</div>
                            <div>下单时间：{{item.date}}</div>
                            <div>商品总数：{{item.num}}</div>
                            <div>优惠后价格：<span style="color: #F56C6C;">￥{{(item.total * 0.9).toFixed(2)}}</span></div>
                        </div>
                    </template>
                    <div>
                        <el-table
                            :data="item.cars"
                            style="width: 100%">
                            <el-table-column
                                align="center"
                                label="商品图片">
                                <template slot-scope="scope">
                                    <img class="b-1" :src="scope.row.obj.img" width="100px" height="75px"/>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="obj.name"
                                align="center"
                                label="商品名称">
                            </el-table-column>
                            <el-table-column
                                prop="obj.price"
                                align="center"
                                label="商品价格">
                            </el-table-column>
                            <el-table-column
                                prop="num"
                                align="center"
                                label="购买数量">
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="m-t-4 p-r-5 d-flex jc-end"><el-button type="danger" @click="deleteOrderItem(i)">删除订单</el-button></div>
                </el-collapse-item>
            </el-collapse>
        </el-card>
    </div>
</template>

<script>
export default {
  name: 'order',
  data () {
    return {
      orders: [],
      flag: false
    }
  },
  created () {
    this.getOrders()
  },
  methods: {
    // 从 localStorage 中获取订单数据
    getOrders () {
      console.log('哈哈哈')
      const orders = JSON.parse(localStorage.getItem('order'))
      if (orders === null || orders.length === 0) {
        this.flag = true
        this.orders = orders
      } else {
        this.orders = orders
      }
    },
    // 删除订单项
    deleteOrderItem (index) {
      this.$confirm('确定删除此订单', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        // localStorage 中删除
        const arr = JSON.parse(localStorage.getItem('order'))
        arr.splice(index, 1)
        localStorage.setItem('order', JSON.stringify(arr))
        // 重新获取订单数据
        this.getOrders()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
    .el-collapse{
        width: 1200px;
    }
    .el-table__row{
        display: flex;
        justify-content: space-around;
    }
</style>
