<template>
    <div class="container">
        <el-carousel trigger="click" height="400px" type="card" interval="5000">
            <el-carousel-item v-for="item in 4" :key="item">
                <h3 class="small">{{ item }}</h3>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            //传入类型
            type: [Object, Array],
            //必填
            required: true
        }

    }
}
</script>

<style lang="less">
    .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: orange;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: skyblue;
  }
</style>