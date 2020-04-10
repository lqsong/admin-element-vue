<template>
    <div class="page-header">
        <div class="page-header-conent">
            <div class="page-header-top">
                <slot>标题</slot>
            </div>
            <div class="page-header-msg" v-if="into !== ''">{{ into }}</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'PageHeader',
    props: {
        into: {
            type: String,
            default: ''
        }
    }
};
</script>
<style lang="scss" scoped>
@import "~@/assets/css/variables.scss";
.page-header {
    margin: -24px -24px 0;
    background-color: #FFF;
    .page-header-conent {
        padding: 16px 24px;
        .page-header-top {
            color: rgba(0,0,0,.85);
            font-size: 20px;
            line-height: 32px;
        }
        .page-header-msg {
            padding-top: 12px;
            color: rgba(0,0,0,.65);
            font-size: 14px;
            font-variant: tabular-nums;
            line-height: 1.5715;
            list-style: none;
            font-feature-settings: "tnum","tnum";
        }
    }
}
</style>