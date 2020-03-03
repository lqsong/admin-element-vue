<template>
    <div id="indexlayout-left" :class="{'narrow': isCollapse}">
      <div class="indexlayout-left-logo" v-if="siteSidebarLogo">
        <router-link to="/" class="logo-url">
          <h3 v-if="!isCollapse" class="logo-title" >AdminElementVue</h3>
          <img v-else alt="Vue logo" src="../../assets/images/logo.png" width="30">
        </router-link>
      </div>
      <div class="indexlayout-left-menu">
          <el-scrollbar class="flex-scrollbar" wrap-class="default-scrollbar__wrap">
              <el-menu
                :background-color="variables.menuBg"
                :text-color="variables.menuText"
                default-active="2"
                :collapse="isCollapse"
                :collapse-transition="false">
                <div>
                <el-submenu index="1">
                  <template slot="title">
                    <svg-icon icon-class="home" />
                    <span>导航一</span>
                  </template>
                    <div>
                        <a href="#/plan/manage/list" class="router-link-exact-active router-link-active">
                            <el-menu-item index="1-1">选项1</el-menu-item>
                        </a>
                    </div>
                    <div>
                        <a href="#/plan/manage/list" class="router-link-exact-active router-link-active">
                            <el-menu-item index="1-2">选项2</el-menu-item>
                        </a>
                    </div>
                    <div  class="nest-menu">
                        <el-submenu index="1-41" >
                            <template slot="title">选项41</template>
                            <div>
                                <a href="#/plan/manage/list" class="router-link-exact-active router-link-active">
                                    <el-menu-item index="1-4-11">选项11</el-menu-item>
                                </a>
                            </div>
                        </el-submenu>
                    </div>

                    <div  class="nest-menu">
                        <el-submenu index="1-42" >
                            <template slot="title">选项42</template>
                            <div>
                                <a href="#/plan/manage/list" class="router-link-exact-active router-link-active">
                                    <el-menu-item index="1-4-12">选项12</el-menu-item>
                                </a>
                            </div>
                        </el-submenu>
                    </div>
                    <div  class="nest-menu">
                        <el-submenu index="1-43" >
                            <template slot="title">选项43</template>
                            <div>
                                <a href="#/plan/manage/list" class="router-link-exact-active router-link-active">
                                    <el-menu-item index="1-4-13">选项13</el-menu-item>
                                </a>
                            </div>
                        </el-submenu>
                    </div>
                    <div  class="nest-menu">
                        <el-submenu index="1-44" >
                            <template slot="title">选项4</template>
                            <div>
                                <a href="#/plan/manage/list" class="router-link-exact-active router-link-active">
                                    <el-menu-item index="1-4-14">选项14</el-menu-item>
                                </a>
                            </div>
                        </el-submenu>
                    </div>
                    <div  class="nest-menu">
                        <el-submenu index="1-45" >
                            <template slot="title">选项45</template>
                            <div>
                                <a href="#/plan/manage/list" class="router-link-exact-active router-link-active">
                                    <el-menu-item index="1-4-15">选项15</el-menu-item>
                                </a>
                            </div>
                        </el-submenu>
                    </div>
                    <div  class="nest-menu">
                        <el-submenu index="1-46" >
                            <template slot="title">选项46</template>
                            <div>
                                <a href="#/plan/manage/list" class="router-link-exact-active router-link-active">
                                    <el-menu-item index="1-4-16">选项16</el-menu-item>
                                </a>
                            </div>
                        </el-submenu>
                    </div>
                    <div  class="nest-menu">
                        <el-submenu index="1-47" >
                            <template slot="title">选项47</template>
                            <div>
                                <a href="#/plan/manage/list" class="router-link-exact-active router-link-active">
                                    <el-menu-item index="1-4-17">选项17</el-menu-item>
                                </a>
                            </div>
                        </el-submenu>
                    </div>
                    <div  class="nest-menu">
                        <el-submenu index="1-48" >
                            <template slot="title">选项48</template>
                            <div>
                                <a href="#/plan/manage/list" class="router-link-exact-active router-link-active">
                                    <el-menu-item index="1-4-18">选项18</el-menu-item>
                                </a>
                            </div>
                        </el-submenu>
                    </div>
                    
                </el-submenu>
                </div>
                <div>
                <el-submenu index="11">
                  <template slot="title">
                    <svg-icon icon-class="chart" />
                    <span>图表</span>
                  </template>
                    <div>
                        <a href="#/plan/manage/list" class="router-link-exact-active router-link-active">
                            <el-menu-item index="1-11">选项1</el-menu-item>
                        </a>
                    </div>
                    <div>
                        <a href="#/plan/manage/list" class="router-link-exact-active router-link-active">
                            <el-menu-item index="1-21">选项2</el-menu-item>
                        </a>
                    </div>
                    <div  class="nest-menu">
                        <el-submenu index="1-41" >
                            <template slot="title">选项4</template>
                            <div>
                                <a href="#/plan/manage/list" class="router-link-exact-active router-link-active">
                                    <el-menu-item index="1-4-11">选项1</el-menu-item>
                                </a>
                            </div>
                        </el-submenu>
                    </div>
                </el-submenu>
                </div>
                <div>
                    <a href="#/plan/manage/list" class="router-link-exact-active router-link-active">
                        <el-menu-item index="2">
                            <svg-icon icon-class="page" />
                            <span slot="title">自定义页面</span>
                        </el-menu-item>
                    </a>
                </div>
                <div>
                    <a href="#/plan/manage/list" class="router-link-exact-active router-link-active">
                        <el-menu-item index="3">
                            <svg-icon icon-class="set" />
                            <span slot="title">设置</span>
                        </el-menu-item>
                    </a>
                </div>

              </el-menu>
        
          </el-scrollbar>
      </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import variables from '@/assets/css/variables.scss';
export default {
  name: 'LayoutIndexLeft',
  computed: {
    ...mapGetters([
      'permission_routes',
      'siteSidebarLogo',
      'sidebarOpened'
    ]),
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebarOpened;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@/assets/css/variables.scss";
#indexlayout-left {
  display: flex;
  flex-direction: column;
  width: $leftSideBarWidth;
  height: 100vh;
  background-color: $leftBgColor;
  color: $topMenuFontColor;
  transition-duration: 0.1s;
  .indexlayout-left-logo{
    width: 100%;
    height: $headerHeight;
    line-height: $headerHeight;
    text-align: center;
    vertical-align: middle;
    /* background-color: $subMenuBg; */
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
    img{
      vertical-align: middle;
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

  &.narrow{
      width: $leftSideBarMinWidth;      
  }
}
</style>