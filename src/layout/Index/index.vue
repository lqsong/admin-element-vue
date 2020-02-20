<template>
  <div id="indexlayout">
    <div id="indexlayout-left">
      <div class="indexlayout-left-logo">
        <router-link to="/" class="logo-url">
          <h3 class="logo-title">AdminElementVue</h3>
        </router-link>
      </div>
      <div class="indexlayout-left-menu">
        <el-scrollbar wrap-class="scrollbar-wrapper">
        左侧导航<br>
        123<br>
        123<br>
        123<br>
        123<br>
        123<br>
        123<br>
        123<br>
        123<br>
        123<br>
        123<br>
        123<br>
        123<br>
        123<br>
        123<br>
        123<br>
        123<br>
        123<br>
        123<br>
        456<br>
        </el-scrollbar>
      </div>
    </div>
    <div id="indexlayout-right" class="fiexd-header">
        <div class="indexlayout-right-top">
            <div class="indexlayout-right-top-top">
               <div class="indexlayout-flexible">
                 <svg-icon icon-class="s-fold" />
               </div>
               <div class="indexlayout-top-menu">
                顶部导航              
               </div>
               <div class="indexlayout-top-menu-right">
                 个人信息
               </div>
            </div>
            <div class="indexlayout-right-top-bot">
                <div class="indexlayout-right-top-bot-home">
                  <i class="el-icon-location-outline" />
                </div>
                <el-breadcrumb class="breadcrumb" separator="/">
                  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                  <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
                  <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                  <el-breadcrumb-item>活动详情</el-breadcrumb-item>
                </el-breadcrumb>                
            </div>
        </div>
        <div class="indexlayout-right-main" >
          <app-main />
        </div>
    </div>    
  </div>
</template>
<script>
/** 
 * Index 框架
 * @author LiQingSong
 */
import AppMain from '../components/AppMain';
export default {
  name: 'LayoutIndex',
  components: {
    AppMain
  }
};
</script>
<style lang="scss" scoped>
@import "~@/assets/css/variables.scss";
#indexlayout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}
#indexlayout-left {
  display: flex;
  flex-direction: column;
  width: $leftSideBarWidth;
  height: 100vh;
  background-color: $leftBgColor;
  color: #fff;
  .indexlayout-left-logo{
    width: 100%;
    height: $headerHeight;
    line-height: $headerHeight;
    text-align: center;
    vertical-align: middle;
    .logo-url {
      display: inline-block;
      width: 100%;
      height: 100%;
      overflow: hidden;
      .logo-title {
        display: inline-block;
        margin: 0;
        font-size: 18px;
        font-family: Roboto,sans-serif;
        color: #fff;
      }
    }
    
  }
  .indexlayout-left-menu{
    flex: 1;
    /* overflow: auto; */
    .el-scrollbar {
        height: 100vh;
    }
  }
}
#indexlayout-right {
  position: relative;
  flex: 1;
  overflow: auto;
  background-color: $mainBgColor;
  .indexlayout-right-top {
    width: 100%;
    height: ($headerHeight+$headerBreadcrumbHeight);
    box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);
    .indexlayout-right-top-top{
      display: flex;
      width: 100%;
      height: $headerHeight;
      background-color: $leftBgColor;
      color: #FFFFFF;
      .indexlayout-flexible,
      .indexlayout-top-menu-right,
      .indexlayout-top-menu{
        height: $headerHeight;
        line-height: $headerHeight;
      }
      .indexlayout-flexible{
        width: $headerHeight;
        text-align: center;
        font-size: 20px;
        cursor: pointer;
        &:hover{
          background-color: $leftMenuActiveBgColor;
        }
      }
      .indexlayout-top-menu-right{
        width: 200px;
      }
      .indexlayout-top-menu{
        flex: 1;
        overflow: hidden;
        /* overflow-x: auto; */
        .breadcrumb{
          line-height: $headerHeight;
        }
      }
    }
    .indexlayout-right-top-bot{
      display: flex;
      width: 100%;
      height: $headerBreadcrumbHeight;
      background-color: $mainBgColor;
      .indexlayout-right-top-bot-home{
        width: $headerBreadcrumbHeight;
        height: $headerBreadcrumbHeight;
        line-height: $headerBreadcrumbHeight;
        text-align: center;
      }
      .breadcrumb{
        line-height: $headerBreadcrumbHeight;
      }
    }
  }
  &.fiexd-header{
    display: flex;
    flex-direction: column;
    .indexlayout-right-main {
      flex: 1;
      overflow: auto;
    }
  }

}


</style>