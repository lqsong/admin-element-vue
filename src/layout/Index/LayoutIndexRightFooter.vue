<template>
    <div class="indexlayout-right-footer">
        <div class="footer-links">
            <a href="#" target="_blank">DEMO</a>
            <a href="https://github.com/lqsong/admin-element-vue" target="_blank">Github</a>
            <a href="http://liqingsong.cc" target="_blank">博客</a>
            <a href="http://www.wyxgn.com" target="_blank">网页小功能</a>
        </div>
        <div class="footer-copyright">
            Copyright © 2020 WYXGN.COM, All Rights Reserved
        </div>
    </div>
</template>
<script>
export default {
    name: 'LayoutIndexRightFooter'
};
</script>
<style lang="scss" scoped>
.indexlayout-right-footer {
    padding: 48px 0 24px;
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
            &:hover{
                color: #515a6e;
            }
        }
    }
}
</style>