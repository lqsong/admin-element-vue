<template>
  <div id="indexlayout">
    <div id="indexlayout-left">
      <div class="indexlayout-left-logo">
        <router-link to="/" class="logo-url">
          <h3 class="logo-title">AdminElementVue</h3>
        </router-link>
      </div>
      <div class="indexlayout-left-menu">
          <el-scrollbar class="flex-scrollbar" wrap-class="default-scrollbar__wrap">
              <el-menu
                default-active="2"
                class="el-menu-vertical-demo">
                <el-submenu index="1">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>导航一</span>
                  </template>
                  <el-menu-item-group>
                    <template slot="title">分组一</template>
                    <el-menu-item index="1-1">选项1</el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
                  </el-menu-item-group>
                  <el-menu-item-group title="分组2">
                    <el-menu-item index="1-3">选项3</el-menu-item>
                  </el-menu-item-group>
                  <el-submenu index="1-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="1-4-1">选项1</el-menu-item>
                  </el-submenu>
                </el-submenu>
                <el-menu-item index="2">
                  <i class="el-icon-menu"></i>
                  <span slot="title">导航二</span>
                </el-menu-item>
                <el-menu-item index="3" disabled>
                  <i class="el-icon-document"></i>
                  <span slot="title">导航三</span>
                </el-menu-item>
                <el-menu-item index="4">
                  <i class="el-icon-setting"></i>
                  <span slot="title">导航四</span>
                </el-menu-item>
              </el-menu>
        
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
                  <el-scrollbar class="horizontal-scrollbar">
                        <a class="indexlayout-top-menu-li active" href="javascript:void(null);">首页</a> 
                        <a class="indexlayout-top-menu-li" href="javascript:void(null);">图表统计</a>
                        <a class="indexlayout-top-menu-li" href="javascript:void(null);">列表页</a>
                        <a class="indexlayout-top-menu-li" href="javascript:void(null);">发布页</a> 
                        <a class="indexlayout-top-menu-li" href="javascript:void(null);">详情页</a> 
                  </el-scrollbar>
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
  color: $topMenuFontColor;
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
        font-size: 16px;
        font-family: Roboto,sans-serif;
        color: $topMenuFontColor;
      }
    }
    
  }
  .indexlayout-left-menu{
    flex: 1;
    display: flex;
    /* overflow: auto; */
    // height: calc(100vh);
    /* .el-scrollbar {
        flex:1;
    } */
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
      color: $topMenuFontColor;
      .indexlayout-flexible,
      .indexlayout-top-menu-right,
      .indexlayout-top-menu{
        height: $headerHeight;
        line-height: $headerHeight;
      }
      .indexlayout-flexible{
        width: $headerHeight;
        text-align: center;
        cursor: pointer;
        &:hover{
          background-color: $topMenuHoverBgColor;
          color: $topMenuHoverFontColor;
        }
      }
      .indexlayout-top-menu-right{
        width: 200px;
      }
      .indexlayout-top-menu{
        flex: 1;
        display: flex;
        overflow: hidden;
        /* overflow-x: auto; */
        .indexlayout-top-menu-li{
          display: inline-block;
          padding: 0 15px;
          height: ($headerHeight)-3;
          text-decoration: none;
          color: $topMenuFontColor;
          font-size: 15px;
          border-bottom: solid 3px $leftBgColor;
          &:hover,
          &.active{
            background-color: $topMenuHoverBgColor;
            color: $topMenuHoverFontColor;
            border-bottom-color: $leftMenuActiveBgColor;
          }
          &.active{
            background-color: $topMenuActiveBgColor;
          }
        }
        .breadcrumb{
          line-height: $headerHeight;
          .el-breadcrumb__item{
            display: inline-block;
            float: none;
          }
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