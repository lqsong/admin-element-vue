<template>
    <div class="indexlayout-main-conent" v-loading="loading">
        
            <el-card shadow="never" class="cus-card"  style="margin-bottom: 20px">
                <template #header>退款申请</template>

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
                      <template #default="{ row }">  
                              {{ row.content1 }}
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
                      <template  #default="{ row }"> 
                            {{ row.content2 }}
                      </template>
                    </el-table-column>
                </el-table>              
                

            </el-card>

            <el-card shadow="never" class="cus-card" style="margin-bottom: 20px">
                <template #header>用户信息</template>

                <el-table
                    class="custom-table"
                    border
                    :show-header="false"
                    :data="userTableData"
                    :span-method="({ rowIndex, columnIndex }) => {
                        if (rowIndex === 2) {
                            if (columnIndex === 1) {
                                return [1, 3];
                            }
                        }
                    }">
                   
                    <el-table-column
                      class-name="custom-td-header-one"
                      prop="title1"
                      label="标题"
                      width="185">                                           
                    </el-table-column>

                    <el-table-column                     
                      label="内容"
                      min-width="310">
                      <template  v-slot="scope">  
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
                      <template  v-slot="scope"> 
                            {{ scope.row.content2 }}
                      </template>
                    </el-table-column>
                </el-table> 

            </el-card>

            <el-card shadow="never" class="cus-card" style="margin-bottom: 20px">
                <template #header>退货商品</template>

                <el-table
                    row-key="id"
                    header-row-class-name="custom-table-header"
                    stripe
                    border
                    :data="goodsData"
                    :span-method="({ row, column, rowIndex, columnIndex })=> {
                        if (row.id === '总计') {
                            if (columnIndex === 0) {
                                return {
                                    rowspan: 1,
                                    colspan: 4
                                };
                            } else if ([1,2,3].includes(columnIndex)) {
                                return {
                                    rowspan: 0,
                                    colspan: 0
                                };
                            } else {
                                return {
                                    rowspan: 1,
                                    colspan: 1
                                };
                            }
                        }
                    }"
                    style="width: 100%">
                    <el-table-column
                        prop="id"
                        label="商品编号"
                        width="180">
                        <template #default="{row}">
                            <span v-if="row.id==='总计'" style="font-weight: bold;">总计</span>
                            <a v-else href="javascript:;">{{row.id}}</a>                                
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="商品名称"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="barcode"
                        label="商品条码"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="price"
                        label="单价"
                    >
                    </el-table-column>                        
                    <el-table-column
                        prop="num"
                        label="数量（件）"
                    >
                        <template #default="{row}">
                            <span v-if="row.id==='总计'" style="font-weight: bold;">{{row.num}}</span>
                            <span v-else >{{row.num}}</span>                                
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="amount"
                        label="金额"
                    >
                        <template #default="{row}">
                            <span v-if="row.id==='总计'" style="font-weight: bold;">{{row.amount}}</span>
                            <span v-else >{{row.amount}}</span>                                
                        </template>
                    </el-table-column>
                </el-table>

            </el-card>

            <el-card shadow="never" class="cus-card">
                <template #header>退货进度</template>

                <el-table
                    row-key="key"
                    header-row-class-name="custom-table-header"
                    stripe
                    border
                    :data="returnProgress"
                    style="width: 100%">
                    <el-table-column
                        prop="time"
                        label="时间"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="rate"
                        label="当前进度"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="status"
                        label="状态"
                    >
                        <template #default="scope">
                            <el-badge class="status" is-dot v-if="scope.row.status === 'success'" type="primary">成功</el-badge>
                            <el-badge class="status" is-dot v-else type="success" >进行中</el-badge>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="operator"
                        label="操作员ID"
                    >
                    </el-table-column>                        
                    <el-table-column
                        prop="cost"
                        label="耗时"
                    >
                    </el-table-column>                        
                </el-table>
                
            </el-card>

              
    </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref, h } from "vue";
import { useStore } from 'vuex';
import { StateType as DetailStateType } from './store';
import { RefundApplicationDataType, ReturnGoodsDataType, ReturnProgressDataType, UserInfoDataType, TableDetailType } from './data.d';

interface DetailBasicPageSetupData {
    loading: boolean;
    baseTableData: TableDetailType[];
    userTableData: TableDetailType[];
    goodsData: ReturnGoodsDataType;
    returnProgress: ReturnProgressDataType;
}

export default defineComponent({
    name: 'DetailTablePage',
    setup(): DetailBasicPageSetupData {
        const store = useStore<{ DetailTable: DetailStateType}>();

        // 退款申请 信息
        const refundApplication = computed<RefundApplicationDataType>(() => store.state.DetailTable.detail.refundApplication);
        const baseTableData = computed<TableDetailType[]>(()=> {
            return [ 
                    {
                        title1: '取货单号',
                        content1: refundApplication.value.ladingNo,
                        title2: '状态',
                        content2: refundApplication.value.state
                    }, 
                    {
                        title1: '销售单号',
                        content1: refundApplication.value.saleNo,
                        title2: '子订单',
                        content2: refundApplication.value.childOrders
                    }
            ];
        });

        // 用户信息
        const userInfo = computed<UserInfoDataType>(() => store.state.DetailTable.detail.userInfo);
        const userTableData = computed<TableDetailType[]>(()=> {
            return [ 
                    {
                        title1: '用户姓名',
                        content1: userInfo.value.name,
                        title2: '联系电话',
                        content2: userInfo.value.tel
                    }, 
                    {
                        title1: '常用快递',
                        content1: userInfo.value.courier,
                        title2: '取货地址',
                        content2: userInfo.value.address
                    }, 
                    {
                        title1: '备注',
                        content1: userInfo.value.remark,
                        title2: '',
                        content2: ''
                    }
            ];
        })

        // 退货商品
        const returnGoods = computed<ReturnGoodsDataType[]>(() => store.state.DetailTable.detail.returnGoods);
        const goodsData = computed<ReturnGoodsDataType[]>(() => {
            let goodsData: typeof returnGoods.value = [];
            if (returnGoods.value.length) {
                let num = 0;
                let amount = 0;
                returnGoods.value.forEach(item => {
                    num += Number(item.num);
                    amount += Number(item.amount);
                });
                goodsData = returnGoods.value.concat({
                    id: '总计',
                    num,
                    amount,
                });
            }
            return goodsData;
        });

        // 退货进度
        const returnProgress = computed<ReturnProgressDataType[]>(() => store.state.DetailTable.detail.returnProgress);


        // 读取数据 func
        const loading = ref<boolean>(true);
        const getData = async () => {
            loading.value = true;
            await store.dispatch('DetailTable/queryDetail');
            loading.value = false;
        }

        onMounted(()=> {
           getData();
        })


        return {
            loading: loading as unknown as boolean,
            baseTableData: baseTableData as unknown as TableDetailType[],
            userTableData: userTableData as unknown as TableDetailType[],
            goodsData: goodsData as unknown as ReturnGoodsDataType,
            returnProgress: returnProgress as unknown as ReturnProgressDataType,
        }
    }
})
</script>
<style lang="scss" scoped>
.status {
    padding-left: 20px;
    ::v-deep(.el-badge__content.is-fixed.is-dot) {
        top: 12px;
        left: -8px;        
    }
}
</style>