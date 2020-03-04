<template>
    <el-breadcrumb separator="/" class="el-breadcrumb-cus">
        <el-breadcrumb-item v-for="(item, index) in levelList" :key="index">
            <app-link v-if="item.linkpath" :to="item.linkpath">
                {{ item.meta.title }}
            </app-link>
            <template v-else>
                {{ item.meta.title }}
            </template>
        </el-breadcrumb-item>
    </el-breadcrumb>                
</template>
<script>
import AppLink from '@/components/Link';
export default {
    name: 'Breadcrumb',
    components: {
        AppLink
    },
    data() {
        return {
            levelList: null
        };
    },
    watch: {
        $route() {
            this.getBreadcrumb();
        }
    },
    methods: {
        getBreadcrumb() {
            
            const route = this.$route; 
            if(route.meta && route.meta.breadcrumb) {
               this.levelList = route.meta.breadcrumb;
               return false;
            }

            // only show routes with meta.title
            let matched = route.matched.filter(item => item.meta && item.meta.title);
            this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false);
        }
    },
    created() {
        this.getBreadcrumb();
    }
};
</script>
<style lang="scss" scoped>
@import "~@/assets/css/variables.scss";
.el-breadcrumb-cus {
    /deep/ .el-breadcrumb__item {
        .el-breadcrumb__inner{
            color: #C0C4CC;
        }
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
                color: $BreadcrumbFontColor;
            }
        }
    } 
}
</style>