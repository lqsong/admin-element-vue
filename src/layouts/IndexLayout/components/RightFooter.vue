<template>
    <div class="indexlayout-right-footer">
      <div class="footer-links">
        <a
          href="http://tsv2-demo.admin-element-vue.liqingsong.cc"
          target="_blank"
          rel="noreferrer"
        >
          DEMO
        </a>
        <a
          href="https://github.com/lqsong/admin-element-vue"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </a>
        <a href="http://liqingsong.cc" target="_blank" rel="noreferrer">
          博客
        </a>
        <a href="http://www.wyxgn.com" target="_blank" rel="noreferrer">
          网页小功能
        </a>
      </div>
      <div>Copyright © 2020 LIQINGSONG.CC, All Rights Reserved</div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    name: 'RightFooter',
    components: {
    }
})
</script>
<style lang="scss" scoped>
.indexlayout-right-footer {
  height: 50px;
  overflow: hidden;
  text-align: center;
  font-size: 14px;
  color: #808695;
  .footer-links {
    margin-bottom: 10px;
    a {
      margin-right: 30px;
      color: #808695;
      text-decoration: none;
      &:last-child {
        margin-right: 0;
      }
      &:hover {
        color: #515a6e;
      }
    }
  }
}
</style>