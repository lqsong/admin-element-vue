<template>
    <div class="main-conent main-conent-screen main-conent-bgFFF main-conent-borderradius">
            <div class="screen-header">
                <el-row>
                    <el-col :span="8">
                        <el-button type="primary" icon="el-icon-plus">新增</el-button>
                        <el-dropdown class="margin-l10">
                            <el-button type="primary" icon="el-icon-plus">
                                更多操作<i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>批量删除</el-dropdown-item>
                                <el-dropdown-item>批量审批</el-dropdown-item>
                                <el-dropdown-item>批量编辑</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-col>
                    <el-col :span="16" class="text-right">
                        <el-input
                            class="margin-l10"
                            style="width:200px;"
                            placeholder="请输入搜索内容"
                            v-model="input1">
                            <i slot="suffix" class="el-input__icon el-icon-search cursor-pointer"></i>
                        </el-input>
                        <el-button icon="el-icon-circle-check" class="margin-l10" @click="searchDrawer = true">高级搜索</el-button>
                    </el-col>
                </el-row>              
            </div>

           <screen-table
               class="screen-conent"
               table-class="custom-table"
               header-row-class-name="custom-table-header"
               :data="tableData">
                    <el-table-column
                        fixed
                        type="selection"
                        width="55">
                    </el-table-column>
                    <el-table-column
                        fixed
                        prop="date"
                        label="日期"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="姓名"
                        min-width="120">
                    </el-table-column>
                    <el-table-column
                        prop="province"
                        label="省份"
                        min-width="120">
                    </el-table-column>
                    <el-table-column
                        prop="city"
                        label="市区"
                        min-width="120">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="地址"
                        min-width="300">
                    </el-table-column>
                    <el-table-column
                        prop="zip"
                        label="邮编"
                        min-width="120">
                    </el-table-column>
                    <el-table-column
                        fixed="right"
                        label="操作"
                        width="100">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="text">查看</el-button>
                            <el-dropdown class="margin-l5">
                                <span class="cursor-pointer">
                                    <el-button type="text" >更多<i class="el-icon-arrow-down el-icon--right"></i></el-button>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item @click.native="tableEdit(scope.row)">编辑</el-dropdown-item>
                                    <el-dropdown-item @click.native="tableDel(scope.row)">删除</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </template>
                    </el-table-column>
            </screen-table>


            <div class="screen-footer text-right">
                <el-pagination
                    background
                    layout="sizes, prev, pager, next, total"
                    :page-sizes="[10, 20, 50, 100]"
                    :total="1000">
                </el-pagination>
            </div>


                <el-drawer
                    custom-class="custom-drawer"
                    :visible.sync="searchDrawer"
                    size="500px"
                    append-to-body
                    title="高级搜索">
                    
                    <el-form>
                        <el-row :gutter="24">
                            <el-col :span="12">
                                <el-form-item label="活动名称">
                                    <el-input v-model="input1"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="省市区">
                                    <el-select v-model="svalue2" clearable placeholder="请选择" style="width:100%;">
                                        <el-option label="浙江" value="1"></el-option>
                                        <el-option label="安徽" value="2"></el-option>
                                        <el-option label="江苏" value="3"></el-option>
                                        <el-option label="北京" value="4"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="24">
                            <el-col :span="12">
                                <el-form-item label="活动名称">
                                    <el-input v-model="input1"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="活动名称">
                                    <el-input v-model="input1"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="24">
                            <el-col :span="12">
                                <el-form-item label="活动名称">
                                    <el-input v-model="input1"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="活动名称">
                                    <el-input v-model="input1"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="24">
                            <el-col :span="12">
                                <el-form-item label="活动名称">
                                    <el-input v-model="input1"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="活动名称">
                                    <el-input v-model="input1"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="24">
                            <el-col :span="12">
                                <el-form-item label="活动名称">
                                    <el-input v-model="input1"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="活动名称">
                                    <el-input v-model="input1"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="24">
                            <el-col :span="12">
                                <el-form-item label="活动名称">
                                    <el-input v-model="input1"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="活动名称">
                                    <el-input v-model="input1"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="24">
                            <el-col :span="12">
                                <el-form-item label="活动名称">
                                    <el-input v-model="input1"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="活动名称">
                                    <el-input v-model="input1"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>


                    <div class="custom-drawer-footer">
                        <el-button>重置</el-button>
                        <el-button type="primary" @click="searchDrawer = false">搜索</el-button>
                    </div>
                </el-drawer>
           
            
    </div>
</template>
<script>
import ScreenTable from '@/components/ScreenTable';
export default {
    components: {
        ScreenTable
    },
    data () {
      return {
        input1: '',
        svalue2: '',
        searchDrawer: false,
        tableData: [
            {
                date: '2016-05-02',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, 
            {
                date: '2016-05-04',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1517 弄',
                zip: 200333
            }, 
            {
                date: '2016-05-01',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1519 弄',
                zip: 200333
            }, 
            {
                date: '2016-05-03',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1516 弄',
                zip: 200333
            },
            {
                date: '2016-05-02',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, 
            {
                date: '2016-05-04',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1517 弄',
                zip: 200333
            }, 
            {
                date: '2016-05-01',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1519 弄',
                zip: 200333
            }, 
            {
                date: '2016-05-03',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1516 弄',
                zip: 200333
            },
            {
                date: '2016-05-02',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, 
            {
                date: '2016-05-04',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1517 弄',
                zip: 200333
            }
        ]
      };
    },
    methods: {
      handleClick(row) {
        console.log(row);
      },
      tableEdit(row){
        console.log(row);
      },
      tableDel(row){
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                console.log(row);
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
      }
    }
};
</script>