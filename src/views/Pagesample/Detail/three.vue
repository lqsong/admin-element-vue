<template>
    <div class="main-conent main-conent-minheight">
            <el-card shadow="never" class="border-none">
                <div slot="header">
                    基本信息
                </div>
                
                <el-table
                    class="custom-table"
                    border
                    :show-header="false"
                    :data="baseTableData">
                   
                    <el-table-column
                      class-name="custom-td-header-one"
                      prop="title1"
                      label="标题"
                      width="185">                                           
                    </el-table-column>

                    <el-table-column                     
                      label="内容"
                      min-width="310">
                      <template  slot-scope="scope">  
                              {{ scope.row.content1 }}
                      </template>   
                    </el-table-column>

                    <el-table-column 
                      class-name="custom-td-header-one"
                      prop="title2"
                      label="标题"                     
                      width="185">
                    </el-table-column>

                    <el-table-column                     
                      label="内容"
                      min-width="310">
                      <template  slot-scope="scope"> 
                            {{ scope.row.content2 }}
                      </template>
                    </el-table-column>
                </el-table>                



            </el-card>

            <el-card shadow="never" class="border-none" style="margin-top:24px;">
                <div slot="header">
                    退款申请
                </div>


                <el-table
                    class="custom-table"
                    border
                    :show-header="false"
                    :data="twoTableData">
                   
                    <el-table-column
                      class-name="custom-td-header-one"
                      prop="title1"
                      label="标题"
                      width="185">                                           
                    </el-table-column>

                    <el-table-column                     
                      label="内容"
                      min-width="310">
                      <template  slot-scope="scope">  
                              {{ scope.row.content1 }}
                      </template>   
                    </el-table-column>

                    <el-table-column 
                      class-name="custom-td-header-one"
                      prop="title2"
                      label="标题"                     
                      width="185">
                    </el-table-column>

                    <el-table-column                     
                      label="内容"
                      min-width="310">
                      <template  slot-scope="scope"> 
                            {{ scope.row.content2 }}
                      </template>
                    </el-table-column>
                </el-table>                

          
            </el-card>

            <el-card shadow="never" class="border-none" style="margin-top:24px;">
                <div slot="header">
                    退货商品
                </div>

                <el-table
                    header-row-class-name="custom-table-header"
                    stripe
                    border
                    :data="tableData">
                    <el-table-column
                        prop="date"
                        label="日期"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="姓名"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="地址"
                        min-width="300">
                    </el-table-column>
                </el-table>
                
            </el-card>

            <el-card shadow="never" class="border-none" style="margin-top:24px;">
                <div slot="header">
                    退货进度
                </div>

                <el-table
                    header-row-class-name="custom-table-header"
                    stripe
                    border
                    :data="tableData">
                    <el-table-column
                        prop="date"
                        label="日期"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="姓名"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="地址"
                        min-width="300">
                    </el-table-column>
                </el-table>
                

            </el-card>
    </div>
</template>
<script>
export default {
    data() {
        return {
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
        };
    },
    computed: {
        // 基本信息-表格数据
        baseTableData: function () { 
            return [ 
                    {
                        title1: '姓名',
                        content1: '王小二',
                        title2: '性别',
                        content2: '男'
                    }, 
                    {
                        title1: '联系电话',
                        content1: '18888888888',
                        title2: '国家',
                        content2: '中国'
                    },
                    {
                        title1: '城市',
                        content1: '某某地',
                        title2: '地址',
                        content2: '某某村'
                    }
               
            ];
        },
        // 退款申请
        twoTableData: function () { 
            return [ 
                    {
                        title1: '订单号',
                        content1: 'dd123456789',
                        title2: '状态',
                        content2: '已取货'
                    }, 
                    {
                        title1: '取货单号',
                        content1: '123456789',
                        title2: '金额',
                        content2: '￥ 888,888'
                    },
                    {
                        title1: '城市',
                        content1: '某某地',
                        title2: '地址',
                        content2: '某某村'
                    }
               
            ];
        }
    }
};
</script>
