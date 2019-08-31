<template>
    <div class="container">
        <el-row class="border-1 box-shadow b-1">
            <el-col :span="4" style="height: 100px;">
                <img :src="restaurant.img" style="width: 130px; height: 100px;">
            </el-col>
            <el-col :span="6" style="height: 100px;">
                <div class="h-100 p-t-2 p-b-2 d-flex flex-column jc-around">
                    <div>{{restaurant.name}}</div>
                    <div>{{restaurant.consume}}/人</div>
                    <div>
                      <el-rate
                          :value=restaurant.fraction
                          disabled
                          show-score
                          text-color="#ff9900"
                          void-color="#aaa"
                          >
                      </el-rate>
                    </div>
                </div>
            </el-col>
            <el-col :span="14" style="height: 100px;">
                <div class="h-100 p-t-2 p-b-2 p-l-3 p-r-3">
                    <div class="p-t-2 p-b-2">简介：</div>
                    <div>{{restaurant.detail}}</div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    props: {
        restaurant: {
            type: Object,
            required: true
        }
    }
}
</script>

<style lang="less" scoped>
    .container{
        width: 1200px;
    }
</style>