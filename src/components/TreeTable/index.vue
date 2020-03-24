<template>
    <div class="tree-table" ref="treetable">
        <div class="tree-table-header" :style="{width: getTreeTableTrWidth + 'px', paddingRight: (getTreeTableContentIsScroll ? getScrollbarWidth : 0) + 'px'}">
            <template v-for="(item, index) in getColumn">
                <div class="tree-table-header-th" :key="index" :style="{width: item.width + 'px'}">
                    <div class="cell">{{item.title}}</div>
                </div>
            </template>
            <div class="tree-table-header-th" v-if="operationOpen" :style="{width: getOperWidth + 'px'}">
                <div class="cell">{{ operationText }}</div>
            </div>
        </div>
        <div class="tree-table-content" ref="treetablecontent" :style="{width: getTreeTableTrWidth + 'px'}">
            <el-tree
                ref="el-tree"
                :data="data"
                :empty-text="emptyText"
                :node-key="nodeKey"
                :lazy="lazy"
                :load="load"
                :props="props"
                :default-expanded-keys="defaultExpandedKeys"
                :show-checkbox="showCheckbox"
                :check-strictly="checkStrictly"
                :default-checked-keys="defaultCheckedKeys"
                :accordion="accordion"
                :icon-class="iconClass"
                :expand-on-click-node="expandOnClickNode"
                @node-click="handleNodeClick"
                @node-expand="handleNodeExpand"
                @node-collapse="handleNodeCollapse">
                <!-- :render-content="renderContent" -->
                <span class="custom-tree-node" slot-scope="{ node, data }">
                    <template v-for="(item, index) in getColumn">
                        <span class="custom-tree-node-td" :key="index" :style="{width: setNodeTdWidth(index, node, item.width) + 'px'}">
                            <div class="cell">{{ data[item.label]}}</div>
                        </span>
                    </template>
                    <span class="custom-tree-node-td" v-if="operationOpen" :style="{width: getOperWidth + 'px'}">
                        <div class="cell">
                            <slot :node="node" :data="data">
                                <!-- <el-button
                                    type="text"
                                    size="mini"
                                    @click="() => append(data)">
                                    添加下级
                                </el-button>
                                <el-button
                                    type="text"
                                    size="mini"
                                    @click="() => remove(node, data)">
                                    删除
                                </el-button> -->
                                <el-button type="text" size="mini">请添加内容，否则请禁用</el-button>
                            </slot>
                        </div>
                    </span>
                </span>
            </el-tree>
        </div>
        <div class="tree-table-bottom-border" :style="{width: getTreeTableTrWidth + 'px'}"></div>
    </div>
</template>
<script>
/**
 * Tree Table
 * Props：
 *      column: [
 *         {
 *             title: '标题', // 栏目名称
 *             label: 'label', // 对应数据栏目的下标名称
 *             minWidth: 300, // 栏目的最小宽度
 *         }
 *      ] 
 * @author LiQingSong
 */
import scrollbarWidth from 'element-ui/src/utils/scrollbar-width';
import { debounce } from '@/utlis';
export default {
    name: 'TreeTable',
    props: {
        // 栏目
        column: {
            type: Array,
            required: true
        },
        // 操作栏目是否开启
        operationOpen: {
            type: Boolean,
            default: true
        },
        // 操作栏目的标题
        operationText: {
            type: String,
            default: '操作'
        },
        // 操作栏目的宽度
        operationWidth: {
            type: Number,
            default: 200
        },
        // 数据
        data: {
            type: Array,
            default: function() {
                return [];
            }
        },
        emptyText: {
            type: String,
            default: '暂无数据'
        },
        nodeKey: {
            type: String,
            required: true
        },
        lazy: {
            type: Boolean,
            default: false
        },
        load: {
            type: Function
        },
        props: {
            type: Object,
            default: function() {
                return {
                    label: 'label',
                    children: 'children',
                    isLeaf: 'leaf'
                };
            }
        },
        defaultExpandedKeys: {
            type: Array,
            default: function() {
                return [];
            }
        },
        showCheckbox: {
            type: Boolean,
            default: false
        },
        checkStrictly: {
            type: Boolean,
            default: false
        },
        defaultCheckedKeys: {
            type: Array,
            default: function() {
                return [];
            }
        },
        accordion: {
            type:Boolean,
            default: false
        },
        iconClass: {
            type: String,
            default: ''
        },
        expandOnClickNode: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            // Tree Table 的宽度
            treeTableWidth: 0,
            // resize事件
            resizeHandler: null,
            // Tree Table 内容区是否有滚动条
            treeTableContentIsScroll: false
        };
    },
    computed: {
        getColumnLen: function () {
            return this.column.length;
        },
        getOperWidth: function() {
            return this.operationOpen ? this.operationWidth : 0;
        },
        getTreeTableWidth: function () {
            return this.treeTableWidth - 2;
        },
        getTreeTableDelOperWidth: function() {
            return this.getTreeTableWidth - this.getOperWidth;
        },
        getColumTableWidthDelOperWidth: function(){
            const _this = this;
            let columTableWidth = 0;
            for (let index = 0; index < _this.getColumnLen; index++) {
                let width = _this.column[index]['minWidth'] ? _this.column[index]['minWidth'] : 100;
                columTableWidth = columTableWidth + width;               
            }
            return columTableWidth;
        },
        getColumTableWidth: function() {
            return this.getColumTableWidthDelOperWidth + this.getOperWidth;
        },
        getTreeTableTrWidth: function() {
            return this.getColumTableWidth > this.getTreeTableWidth ? this.getColumTableWidth : this.getTreeTableWidth;
        },
        getColumn: function() {
            const _this = this;
            if (_this.getTreeTableWidth < 1) {
                return false;
            }

            let newColum = [];
            for (let index = 0; index < _this.getColumnLen; index++) {
                const item = _this.column[index];
                let width = item['minWidth'] ? item['minWidth'] : 100;
                let actualWidth =  _this.getTreeTableDelOperWidth > _this.getColumTableWidthDelOperWidth ? (_this.getTreeTableDelOperWidth * width / _this.getColumTableWidthDelOperWidth) : width;
                newColum.push({
                    title: item['title'],
                    label: item['label'],
                    width: actualWidth
                });             
            }
            /* console.log(this.getColumTableWidthDelOperWidth);
            console.log(this.column);
            console.log(this.getTreeTableWidth); */
            return newColum;
        },
        getTreeTableContentIsScroll: function() {
            return this.treeTableContentIsScroll;
        },
        getScrollbarWidth: function() {
            return scrollbarWidth();
        }    
    },
    methods: {
        initResizeEvent() {
            window.addEventListener('resize', this.resizeHandler);
        },
        setNodeTdWidth(index, node, width) {
            // console.log(index, node, width);
            return index < 1 ? (width - 24 - (node.level - 1 ) * 18) : width;
        },
        setTreeTableContentIsScroll() {
            setTimeout(()=>{
               this.treeTableContentIsScroll = this.$refs.treetablecontent.scrollHeight > this.$refs.treetablecontent.clientHeight;
            },500);
        },
        handleNodeClick(data, node , el){
            this.$emit('node-click', data, node , el);
        },
        handleNodeExpand (data, node , el) {
            this.setTreeTableContentIsScroll();
            setTimeout(()=>{
                this.resizeHandler();
            },500);
            this.$emit('node-expand', data, node , el);
        },
        handleNodeCollapse (data, node , el) {
            this.setTreeTableContentIsScroll();
            setTimeout(()=>{
                this.resizeHandler();
            },500);
            this.$emit('node-collapse', data, node , el);
        },
        getNode(data) {
            return this.$refs['el-tree'].getNode(data);
        },
        remove(data) {
            return this.$refs['el-tree'].remove(data);
        },
        append(data, parentNode) {
            return this.$refs['el-tree'].append(data, parentNode);
        },
        insertBefore(data, refNode) {
            return this.$refs['el-tree'].insertBefore(data, refNode);
        },
        insertAfter(data, refNode) {
            return this.$refs['el-tree'].insertAfter(data, refNode);
        }/* ,
        renderContent(h, { node, data, store }) {
            return (
                <span class="custom-tree-node">
                    <span class="custom-tree-node-td" ><div class="cell">{ node.label }</div></span>
                    <span class="custom-tree-node-td"><div class="cell">{ node.label }</div></span>
                    <span class="custom-tree-node-td">
                        <div class="cell">
                            <el-button
                                type="text"
                                size="mini"
                                on-click={ () => this.append(data) }>
                                添加下级
                            </el-button>
                            <el-button
                                type="text"
                                size="mini"
                                on-click={() => this.remove(node, data)}>
                                删除
                            </el-button>
                        </div>
                    </span>
                </span>
            );
        } 
        */
    },
    mounted() {
        const _this = this;
        _this.resizeHandler = debounce(() => {
            if (_this.$refs.treetable && _this.$refs.treetable.offsetWidth) {
                _this.treeTableWidth = _this.$refs.treetable.offsetWidth;
            }
        }, 100);
        _this.resizeHandler();
        _this.initResizeEvent();
        // console.log(this.data);
    }
    
};
</script>
<style lang="scss" scoped>
.tree-table {
    position: relative;  
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    border: 1px solid #EBEEF5;
    border-bottom: 0;
    overflow: auto;
    .tree-table-header {
        display: table-row;
        box-sizing: border-box;
        font-size: 12px;
        font-weight: 700;
        border-bottom: 1px solid #EBEEF5;
        background-color: #F5F7FA;
        .tree-table-header-th {            
            display: table-cell;
            box-sizing: border-box;
            padding: 8px 0;
            border-right: 1px solid #EBEEF5;
            .cell{
                display: inline-block;
                box-sizing: border-box;
                position: relative;
                vertical-align: middle;
                padding: 0 10px;
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: normal;
                word-break: break-all;
                line-height: 23px;
            }
        }
    }
    .tree-table-content {
        flex: 1;
        overflow: auto;
        /deep/ .el-tree-node__content {
                height: auto;
                border-bottom: 1px solid #EBEEF5;
            }
        /deep/ .custom-tree-node {
            flex: 1;
            font-size: 14px;
            display: table-row;
            .custom-tree-node-td{
                display: table-cell;
                box-sizing: border-box;
                padding: 5px 0;
                border-right: 1px solid #EBEEF5;
                .cell{
                    display: inline-block;
                    box-sizing: border-box;
                    position: relative;
                    vertical-align: middle;
                    padding: 0 10px;
                    width: 100%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: normal;
                    word-break: break-all;
                    line-height: 23px;
                }
            }
        }
    }
    .tree-table-bottom-border {
        position:absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 0px;
        overflow: hidden;
        border-bottom: 1px solid #EBEEF5;
    }
}
</style>