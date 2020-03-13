<template>
    <el-tabs class="tabsleft" tab-position="left" :style="{height: height}" >
        <slot></slot>
    </el-tabs>
</template>
<script>
export default {
    name: 'TabsLeft',
    props: {
        height: {
            type: String,
            required: true
        }
    },
    data() {
        return {
        };
    },
    methods: {
    },
    mounted() {
    }
};
</script>
<style lang="scss" scoped>
.tabsleft {
    /deep/ .el-tabs__content {
        height: 100%;
        overflow: auto;
    }
}
</style>