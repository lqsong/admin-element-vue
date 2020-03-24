<template>
    <div class="main-conent main-conent-screen main-conent-bgFFF main-conent-borderradius">
            <div class="screen-header">
                <el-row>
                    <el-col>
                        <el-button type="primary" @click="add(0)">新增一级</el-button>
                    </el-col>
                   
                </el-row>              
            </div>

            <div class="screen-conent">
                <tree-table
                    :data="data"
                    class="height-100"
                    :column="treeTableColumn"
                    node-key="id"
                    >
                    <template v-slot:default="{ node, data }">
                        <el-button
                            type="text"
                            size="mini"
                            @click.stop="add(node.level, data)">
                            新增下级
                        </el-button>
                        <el-button
                            type="text"
                            size="mini"
                            @click.stop="add(node.level, data)">
                            修改
                        </el-button>
                        <el-button
                            type="text"
                            size="mini"
                            @click.stop="del(data)">
                            删除
                        </el-button> 
                    </template>
                </tree-table>
            </div>

             <div style="padding-top:24px"></div>


           
            
    </div>
</template>
<script>
import TreeTable from '@/components/TreeTable';
export default {
    components: {
        TreeTable
    },
    data () {
      return {
            treeTableColumn: [
                {
                    title: '分类列表',
                    label: 'label1',
                    minWidth: 300
                }
            ],
            data: [
                {
                    id: 1,
                    label1: '一级 1',
                    short: 'one 1',
                    children: [{
                    id: 4,
                    label1: '二级 1-1',
                    short: 'two 1-1',
                    children: [{
                        id: 9,
                        label1: '三级 1-1-1',
                        short: 'three 1-1-1'
                    }, {
                        id: 10,
                        label1: '三级 1-1-2',
                        short: 'three 1-1-1'
                    }]
                    }]
                }, 
                {
                    id: 2,
                    label1: '一级 2',
                    short: 'one 2',
                    children: [{
                    id: 5,
                    label1: '二级 2-1',
                    short: 'two 2-1'
                    }, {
                    id: 6,
                    label1: '二级 2-2',
                    short: 'two 2-3'
                    }]
                },
                {
                    id: 3,
                    label1: '一级 3',
                    short: 'one 3',
                    children: [{
                    id: 7,
                    label1: '二级 3-1',
                    short: 'tow 3-1'
                    }, {
                    id: 8,
                    label1: '二级 3-2',
                    short: 'tow 3-2'
                    }]
                },
                {
                    id: 20,
                    label1: '一级 4',
                    short: 'one 4',
                    children: [{
                    id: 21,
                    label1: '二级 4-1',
                    short: 'tow 4-1'
                    }, {
                    id: 22,
                    label1: '二级 4-2',
                    short: 'tow 4-2'
                    }]
                },
                {
                    id: 30,
                    label1: '一级 5',
                    short: 'one 5',
                    children: [{
                    id: 31,
                    label1: '二级 5-1',
                    short: 'tow 5-1'
                    }, {
                    id: 32,
                    label1: '二级 5-2',
                    short: 'tow 5-2'
                    }]
                }
            ]
      };
    },
    methods: {
        add(level, data) {
            console.log(level, data);
            this.$message({
                message: '这里可以显示一个弹框表单',
                type: 'success'
            });
        },
        del(data) {
            console.log(data);
            const _this = this;
            _this.$confirm('是否确认删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                _this.$message({
                    message: '删除成功',
                    type: 'success'
                });
            }).catch(()=>{});
        }
    }
};
</script>