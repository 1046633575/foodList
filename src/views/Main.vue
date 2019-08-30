<template>
    <div class="container">
        <!--轮播图模块-->
        <div class="swiper m-t-3">
            <my-swiper :data-banner="banner"></my-swiper>
        </div>

        <!-- 店铺模块  -->
        <div class="content m-t-5" style="height: 1000px">
          <div class="item m-b-4 b-1 border-1 box-shadow" :class="i % 2 == 0 ? 'left' : 'right'" v-for="(item,i) in restaurant" :key="item.id">
            <router-link :to="{ path: 'restaurant', query: { id: item.id}}" tag="div" class="p-b-5">
                <div class="d-flex flex-column ai-center p-t-5 b-1">
                  <div style="width: 300px; height: 300px; overflow: hidden;">
                    <img :src="item.img" class="b-1" style="width: 300px; height: 300px;">
                  </div>
                </div>
                <h3 class="p-t-3 p-b-3">{{item.name}}</h3>
                <div class="p-b-3">
                  <el-rate
                    :value=item.fraction
                    disabled
                    show-score
                    text-color="#ff9900"
                    void-color="#aaa"
                    >
                  </el-rate>
                </div>
                <div class="">{{item.consume}} /人</div>
              </router-link>
          </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      banner: [],
      restaurant: [],
      value: 3
    }
  },
  created () {
    // 获取轮播图数据
    this.getBanner()
    // 获取餐厅数据
    this.getRestaurant()
  },
  methods: {
    // 获取轮播图数据
    getBanner () {
      this.$http.get('/banner').then((res) => {
        if (res.status === 200) {
          this.banner = res.data
        }
      })
    },
    // 获取餐厅数据
    getRestaurant () {
      this.$http.get('/restaurant').then((res) => {
        if (res.status === 200) {
          this.restaurant = res.data
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
    .container{
      width: 1200px;
    }
    .swiper{
        width: 1200px;
        height: 400px;
    }
    .content{
      .item{
        width: 45%;
        float: left;
        cursor: pointer;
        &.right{
          float: right;
        }
        & img{
          transition: all 1s;
        }
        &:hover{
          & img{
            transform: scale(1.1);
          }
        }
      }
    }
</style>
