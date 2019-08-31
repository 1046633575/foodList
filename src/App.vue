<template>
  <div id="app">
    <el-container class="d-flex flex-column ai-center">
      <!-- 头部固定的 -->
      <el-header class="b-b-1 p-b-3">
        <el-row class="w-100 h-100">
          <el-col :span="6" class="h-100 d-flex ai-center">
            <a href="#" class="logo">
              <div class="logoBg"></div>
            </a>
          </el-col >
          <el-col :span="5" class="h-100"></el-col>
          <el-col :span="13" class="h-100">
            <el-menu :default-active="activeIndex" class="el-menu-demo  w-100 h-100 d-flex jc-around" default-active="/" mode="horizontal" @select="handleSelect" text-color="#444" active-text-color="#409EFF" router style="border: none;">
              <el-menu-item class="fs-lg" index="/">首页</el-menu-item>
              <el-menu-item class="fs-lg" index="list">排行榜</el-menu-item>
              <el-menu-item class="fs-lg d-flex ai-center" index="car">购物车<el-badge class="mark" :value="this.$store.state.num" /></el-menu-item>
              <el-menu-item class="fs-lg" index="order">订单</el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-header>

      <keep-alive :exclude="['restaurant','car']">
        <router-view></router-view>
      </keep-alive>

    </el-container>
  </div>
</template>

<style lang="less">
@import url('./assets/less/style.less');
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.el-container{
  padding-top: 60px;
  .el-header{
    width: 1200px;
    padding: 0 0;
    background-color: #fff;
    position: fixed;
    top: 0;
    z-index: 999;
    .logo{
      width: 158px;
      height: 60px;
      display: block;
      .logoBg{
        width: 158px;
        height: 60px;
        background: url('./assets/uugai.com_1567004019929.png') no-repeat;
        background-size: cover;
        vertical-align: center;
      }
    }
  }
  .el-main{
    width: 1200px;
    background-color: #2c3e50;
  }
}
</style>
