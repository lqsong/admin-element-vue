<template>
  <div id="indexlayout">
    <div id="indexlayout-left">
      left
    </div>
    <div id="indexlayout-right">
        <div id="indexlayout-right-top">
          top
        </div>
        <app-main />
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
#indexlayout {
  display: flex;
  height: 100vh;
  overflow: hidden;
  background-color: aqua;
}
#indexlayout-left {
  width: 200px;
  height: 100vh;
  background-color: aquamarine;
}
#indexlayout-right {
  flex: 1;
  overflow: auto;
  background-color: bisque;
}
#indexlayout-right-top {
   width: 100%;
   height: 60px;
   background-color: cadetblue;
}
</style>