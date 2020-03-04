<template>
        <div id="indexlayout-right-top" :class="{'enableTopNav': !siteTopNavEnable}">
            <div class="indexlayout-right-top-top">
               <div class="indexlayout-flexible" :class="{'active': isCollapse}" @click="toggleSideBar">
                 <svg-icon icon-class="s-fold" />
               </div>
               <div class="indexlayout-top-menu">
                  <el-scrollbar class="horizontal-scrollbar">
                      <template v-if="siteTopNavEnable">

                          <template v-for="route in permission_routes">
                            <app-link v-if="!route.hidden" :to="route.path" :key="route.path" class="indexlayout-top-menu-li" :class="{'active': getTopMenuActive === route.path}">
                                {{ route.meta.title }}
                            </app-link>
                          </template>

                      </template> 
                      <breadcrumb v-else class="breadcrumb" />   
                  </el-scrollbar>
               </div>
               <div class="indexlayout-top-menu-right">
                    <router-link class="index-layout-message" to="/" title="消息">
                        <svg-icon icon-class="message" />
                        <el-badge :value="100" :max="10" class="index-layout-message-item"></el-badge>
                    </router-link>

                    <el-dropdown>
                        <span class="el-dropdown-link" title="王小二">
                            <span class="el-dropdown-link-text">王小二</span>
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>个人信息</el-dropdown-item>
                            <el-dropdown-item divided>退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
               </div>
            </div>
            <div class="indexlayout-right-top-bot" v-if="siteTopNavEnable">
                <div class="indexlayout-right-top-bot-home">
                  <i class="el-icon-location-outline" />
                </div>
                <breadcrumb class="breadcrumb" />               
            </div>
        </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Breadcrumb from '@/components/Breadcrumb';
import AppLink from '@/components/Link';
import { getBelongTopMenuPath } from '@/utlis/permission';
export default {
  name: 'LayoutIndexRightTop',
  components: {
    Breadcrumb,
    AppLink
  },
  computed: {
    ...mapGetters([
      'permission_routes',
      'siteTopNavEnable',
      'sidebarOpened'
    ]),
    isCollapse() {
      return !this.sidebarOpened;
    },
    getTopMenuActive() {
      let route = this.$route;
      return getBelongTopMenuPath(route);
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar');
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@/assets/css/variables.scss";
#indexlayout-right-top {
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
        &.active{
            svg {
                transform: rotate(180deg);
            }
        }
      }
      .indexlayout-top-menu-right{
        width: 145px;
        .index-layout-message{
          display: inline-block;
          margin-right: 10px;
          color: $topMenuHoverFontColor;
          .index-layout-message-item {
              /deep/ .el-badge__content{
                  border: none;
              }
          }
        }
        .el-dropdown-link {
            display: inline-block;
            cursor: pointer;
            color: $topMenuHoverFontColor;
            .el-dropdown-link-text{
                display: block;
                max-width: 56px;
                height: $headerHeight;
                overflow: hidden;
                float: left;
                white-space: nowrap;
                text-overflow: ellipsis;
                word-break: break-all;
            }
        }
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
          margin-left: 10px;
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
      .indexlayout-right-top-bot-home {
        margin-right: 5px;
        width: $headerBreadcrumbHeight;
        height: $headerBreadcrumbHeight;
        line-height: $headerBreadcrumbHeight;
        text-align: center;
      }
      .breadcrumb{
        line-height: $headerBreadcrumbHeight;
      }
    }
    &.enableTopNav {
      height: $headerHeight;
      .indexlayout-right-top-top {
         background-color: $BreadcrumbBgColor;
         color: $BreadcrumbFontColor;

          .indexlayout-flexible{
            &:hover{
              background-color: $mainBgColor;
              color: $BreadcrumbFontColor;
            }
            
          }

      }
      .indexlayout-top-menu-right{
        .index-layout-message{
            color: $BreadcrumbFontColor;
        }
        .el-dropdown-link {
            color: $BreadcrumbFontColor;
        }
      }
    }
}
</style>