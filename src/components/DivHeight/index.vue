<template>
    <div class="divheight" :style="{height: height}" >
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'DivHeight',
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
.divheight {
    display: block;
    overflow: hidden;
    overflow-y: auto;
}
</style>