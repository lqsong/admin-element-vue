<template>
    <div class="screentable" ref="screentable">
        <el-table
            ref="screentElTable"
            :class="tableClass"
            :data="data"
            :height="tableHeight"
            :show-header="showHeader"
            :stripe="stripe"
            :border="border"
            :size="size"
            :row-class-name="rowClassName"
            :row-style="rowStyle"
            :cell-class-name="cellClassName"
            :cell-style="cellStyle"
            :header-row-class-name="headerRowClassName"
            :header-row-style="headerRowStyle"
            :header-cell-class-name="headerCellClassName"
            :header-cell-style="headerCellStyle"
            @select="handleSelect"
            @select-all="handleSelectAll"
            @selection-change="handleSelectionChange"
            @header-dragend="handleHeaderDragend">
            <slot></slot>
        </el-table>
    </div>
</template>
<script>
import { debounce } from '@/utlis';
export default {
    name: 'ScreenTable',
    props: {
        data: {
            type: Array,
            required: true
        },
        showHeader: {
            type: Boolean,
            default: true
        },
        stripe: {
            type: Boolean,
            default: true
        },
        border: {
            type: Boolean,
            default: true
        },
        emptyText: {
            type: String,
            default: '暂无数据'
        },
        size: {
            type: String
        },
        tableClass: {
            type: [Object,String]
        },
        rowClassName: {
            type: [Function,String]
        },
        rowStyle: {
            type: [Function,String]
        },
        cellClassName: {
            type: [Function,String]
        },
        cellStyle: {
            type: [Function,String]
        },
        headerRowClassName: {
            type: [Function,String]
        },
        headerRowStyle: {
            type: [Function,String]
        },
        headerCellClassName: {
            type: [Function,String]
        },
        headerCellStyle: {
            type: [Function,String]
        }
    },
    data() {
        return {
            tableHeight: 200,
            resizeHandler: null
        };
    },
    methods: {
        initResizeEvent() {
            window.addEventListener('resize', this.resizeHandler);
        },
        clearSelection() {
            this.$refs.screentElTable.clearSelection();
        },
        toggleRowSelection(row, selected) {
            this.$refs.screentElTable.toggleRowSelection(row, selected);
        },
        toggleAllSelection() {
            this.$refs.screentElTable.toggleAllSelection();
        },
        setCurrentRow(row) {
            this.$refs.screentElTable.setCurrentRow(row);
        },
        handleSelect(selection, row) {
            this.$emit('select', selection, row);
        },
        handleSelectAll(selection) {
            this.$emit('select-all', selection);
        },
        handleSelectionChange(val) {
            this.$emit('selection-change', val);
        },
        handleHeaderDragend(newWidth, oldWidth, column, event) {
            this.$emit('header-dragend', newWidth, oldWidth, column, event);
        }
    },
    mounted() {
        const _this = this;
        _this.resizeHandler = debounce(() => {
            if (!_this.$refs.screentable || !_this.$refs.screentable.offsetHeight) {
                return false;
            }
            let heightStyle = _this.$refs.screentable.offsetHeight;
            _this.tableHeight = heightStyle;
        }, 100);
        _this.resizeHandler();
        _this.initResizeEvent();
        
  }
};
</script>
<style lang="scss" scoped>
.screentable {
    overflow: hidden;
}
</style>