<template>
    <el-breadcrumb separator="/" class="el-breadcrumb-cus">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>                
</template>
<script>
export default {
    name: 'Breadcrumb'
};
</script>
<style lang="scss" scoped>
@import "~@/assets/css/variables.scss";
.el-breadcrumb-cus {
    /deep/ .el-breadcrumb__item {
        .is-link,
        a {
            font-weight: 400;
            color: $BreadcrumbFontColor;
            &:hover {
                color: $leftMenuActiveBgColor;
            }
        }
        &:last-child {
            .el-breadcrumb__inner{
                color: #C0C4CC;
            }
        }
    } 
}
</style>