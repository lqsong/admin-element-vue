<template>
  <div id="indexlayout">
    <div id="indexlayout-left">
      <div class="indexlayout-left-logo">
        <router-link to="/" class="logo-url">
          <h3 class="logo-title">AdminElementVue</h3>
        </router-link>
      </div>
      <div class="indexlayout-left-menu">
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
        123<br>
      </div>
    </div>
    <div id="indexlayout-right" class="fiexd-header">
        <div class="indexlayout-right-top">
          top
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
  background-color: aqua;
}
#indexlayout-left {
  display: flex;
  flex-direction: column;
  width: $leftSideBarWidth;
  height: 100vh;
  background-color:#20222A;
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
        color: #fff;
        font-size: 18px;
        font-family: Roboto,sans-serif;
      }
    }
    
  }
  .indexlayout-left-menu{
    flex: 1;
    overflow: auto;
    background-color: darkcyan;
  }
}
#indexlayout-right {
  position: relative;
  flex: 1;
  overflow: auto;
  background-color: bisque;
  .indexlayout-right-top {
    width: 100%;
    height: $headerHeight;
    background-color: cadetblue;
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