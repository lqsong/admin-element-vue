<template>
    <div  class="main-conent main-conent-minheight">
        <el-card shadow="never" class="border-none">
            <div class="list" v-for="item of svgIcons" :key="item">
                <el-tooltip placement="top">
                    <div slot="content">
                        {{ generateIconCode(item) }}
                    </div>
                    <div class="icon-item">
                        <svg-icon :icon-class="item" />
                        <span>{{ item }}</span>
                    </div>
                </el-tooltip>
            </div>
           
        </el-card>
    </div>
</template>
<script>
import svgIcons from './svg-icons';
export default {
    data() {
        return {
            svgIcons
        };
    },
    methods: {
        generateIconCode(symbol) {
            return `<svg-icon icon-class="${symbol}" />`;
        }
    }

};
</script>
<style lang="scss" scoped>
.list {
    padding: 10px 20px;
    width: 100px;
    height: 100px;
    float: left;
    text-align: center;
    font-size: 30px;
    overflow: hidden;
    span {
        display: block;
        font-size: 16px;
        margin-top: 10px;
    }
}
</style>