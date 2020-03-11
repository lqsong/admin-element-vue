<template>
    <div class="main-conent main-conent-minheight">
        <el-card shadow="never" class="border-none">
            <div slot="header">
                <el-row>
                    <el-col :span="8">
                        <el-button type="primary">新增</el-button>
                    </el-col>
                    <el-col :span="16" class="text-right">
                        <el-radio-group v-model="radio1">
                            <el-radio-button label="全部"></el-radio-button>
                            <el-radio-button label="进行中"></el-radio-button>
                            <el-radio-button label="等待中"></el-radio-button>
                        </el-radio-group>
                        <el-input
                            class="margin-l10"
                            style="width:200px;"
                            placeholder="请输入搜索内容"
                            v-model="input1">
                            <i slot="suffix" class="el-input__icon el-icon-search cursor-pointer"></i>
                        </el-input>
                    </el-col>
                </el-row>              
            </div>


            <el-table
                :data="tableData"
                stripe
                >
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
            </el-table>

            <div class="margin-t16 text-right">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="1000">
                </el-pagination>
            </div>
           
            
          </el-card>
    </div>
</template>
<script>
export default {
    data () {
      return {
        radio1: '全部',
        input1: '',
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