<template>
  <div id="app">
    <el-container class="flex flex-col ai-center">
      <el-header class="b-b-1">
        <el-row class="wh100">
          <el-col :span="6" class="h100 flex ai-center">
            <a href="#" class="logo">
              <div class="logoBg"></div>
            </a>
          </el-col >
          <el-col :span="5" class="h100"></el-col>
          <el-col :span="13" class="h100 flex ai-center jc-center">
            <el-menu :default-active="activeIndex" class="el-menu-demo  wh100 flex jc-around" mode="horizontal" @select="handleSelect" style="border: none;">
              <el-menu-item style="font-size: 16px" index="1">首页</el-menu-item>
              <el-menu-item style="font-size: 16px" index="2">排行榜</el-menu-item>
              <el-menu-item style="font-size: 16px" index="3">购物车</el-menu-item>
              <el-menu-item style="font-size: 16px" index="4">订单</el-menu-item>
              
              
            </el-menu>
          </el-col>
        </el-row>
      </el-header>
      
    </el-container>
  </div>
</template>

<style lang="scss">
@import url('./assets/scss/style.scss');
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
  .el-header{
    width: 1200px;
    padding: 0 0;
    background-color: #fff;
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
