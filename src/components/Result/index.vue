<template>
    <div class="result">
        <div class="result-icon">
            <slot name="icon">
                <unauthorized v-if="status==='403'" />
                <noFound v-else-if="status==='404'"/>
                <serverError v-else-if="status==='500'"/>
                <span v-else-if="status==='success'" class="icon-sys icon-success"><success /></span>
                <span v-else-if="status==='warning'" class="icon-sys icon-warning"><warning /></span>
                <span v-else-if="status==='error'" class="icon-sys icon-error"><error /></span>
                <span v-else class="icon-sys icon-info"><info /></span>
            </slot>
        </div>
        <div class="result-title">{{title}}</div>
        <div class="result-subtitle">{{subtitle}}</div>
        <div class="result-content" v-if="$slots.default"><slot></slot></div>
        <div class="result-extra"><slot name="extra"></slot></div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import info from './svg/info.vue';
import success from './svg/success.vue';
import warning from './svg/warning.vue';
import error from './svg/error.vue';
import unauthorized from './svg/unauthorized.vue';
import serverError from './svg/serverError.vue';
import noFound from './svg/noFound.vue';
export default defineComponent({
    name: 'Result',
    props: {
        // ['info', 'success', 'warning ', 'error', '403', '404', '500']
        status: {
            type: String,
            default: 'info'
        },
        title: {
            type: String,
            default: ''
        },
        subtitle: {
            type: String,
            default: ''
        }
    },
    components: {
        info,
        success,
        warning,
        error,
        unauthorized,
        serverError,
        noFound,
    },
})
</script>
<style lang="scss" scoped>
.result {
    padding: 48px 32px;
    margin: 0;
    box-sizing: border-box;
    .icon-sys {
        font-size: 72px;
    }
    .icon-info {
        color: #1890ff;
    }
    .icon-success {
        color: #52c41a;
    }
    .icon-warning {
        color: #faad14;
    }
    .icon-error {
        color: #f5222d;
    }
    .result-icon {
        margin-bottom: 24px;
        text-align: center;
    }
    .result-image {
        width: 250px;
        height: 295px;
        margin: auto;
    }
    .result-title {
        color: rgba(0,0,0,.85);
        font-size: 24px;
        line-height: 1.8;
        text-align: center;
    }
    .result-subtitle {
        color: rgba(0,0,0,.45);
        font-size: 14px;
        line-height: 1.6;
        text-align: center;
    }
    .result-extra {
        margin-top: 32px;
        text-align: center;
    }
    .result-content{
        margin-top: 24px;
        padding: 24px 40px;
        background-color: #fafafa;
    }
}
</style>