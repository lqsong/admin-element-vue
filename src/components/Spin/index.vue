<template>
    <div class="el-loading-parent--relative" :class="{'min-height': spinning}">
        <div v-if="spinning" :class="{'el-loading-mask': spinning && $slots.default }">
            <div class="el-loading-spinner">
                <slot name="icon" >
                    <svg class="circular" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none"></circle></svg>
                </slot>
            </div>
        </div>
        <slot></slot>
    </div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
    name: 'Spin',
    props: {
        spinning: {
            type: Boolean,
            default: true
        }
    }
})
</script>
<style lang="scss" scoped>
.el-loading-parent--relative {
   &.min-height {
        min-height: 45px;
   }
}
.el-loading-mask {
    z-index:auto;
}
</style>