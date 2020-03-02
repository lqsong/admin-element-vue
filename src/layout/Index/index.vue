<template>
  <div id="indexlayout">
    <layout-index-left />
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
import LayoutIndexLeft from './LayoutIndexLeft';
export default {
  name: 'LayoutIndex',
  components: {
    AppMain,
    LayoutIndexLeft
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