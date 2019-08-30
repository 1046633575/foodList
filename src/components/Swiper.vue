<template>
    <div class="container">
        <el-carousel trigger="click" height="400px" type="card" interval="5000">
            <el-carousel-item v-for="item in newBanner" :key="item.id">
                <div :style="item.bg"></div>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
export default {
  props: {
    dataBanner: {
      // 传入类型
      type: [Object, Array],
      // 必填
      required: true
    }
  },
  data () {
    return {
      newBanner: []
    }
  },
  watch: {
    // 接收到父组件传值后做格式处理
    dataBanner: function (newVal) {
      this.formatBanner(newVal)
    }
  },
  methods: {
    // 处理 data,使其能做背景图
    formatBanner (data) {
      for (let item in data) {
        // 处理 data 数据，让其能做背景图
        data[item].bg = `background: url('${data[item].img}') no-repeat; background-size: cover; height: 400px;`
      }
      this.newBanner = data
    }
  }
}
</script>

<style lang="less" scoped>
    .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }
</style>
