<template>
    <div class="indexlayout-main-conent">
        
            <el-card shadow="never" class="cus-card" v-loading="loading">

                <div class="main-conent-detail">
                    <div class="main-conent-detail-title">退款申请</div>
                    <el-row :gutter="24">
                        <el-col :sm="24" :md="12" :lg="8">
                            <span class="main-conent-detail-lable">取货单号</span>
                            <span class="main-conent-detail-content">{{refundApplication.ladingNo}}</span>
                        </el-col>
                        <el-col :sm="24" :md="12" :lg="8">
                            <span class="main-conent-detail-lable">状态</span>
                            <span class="main-conent-detail-content">{{refundApplication.state}}</span>
                        </el-col>
                        <el-col :sm="24" :md="12" :lg="8">
                            <span class="main-conent-detail-lable">销售单号</span>
                            <span class="main-conent-detail-content">{{refundApplication.saleNo}}</span>
                        </el-col>
                        <el-col :sm="24" :md="12" :lg="8">
                            <span class="main-conent-detail-lable">子订单</span>
                            <span class="main-conent-detail-content"> {{refundApplication.childOrders}}</span>
                        </el-col>
                        
                    </el-row>
                </div>
                <el-divider></el-divider>

                <div class="main-conent-detail">
                    <div class="main-conent-detail-title">用户信息</div>
                    <el-row :gutter="24">
                        <el-col :sm="24" :md="12" :lg="8">
                            <span class="main-conent-detail-lable">用户姓名</span>
                            <span class="main-conent-detail-content">{{userInfo.name}}</span>
                        </el-col>
                        <el-col :sm="24" :md="12" :lg="8">
                            <span class="main-conent-detail-lable">联系电话</span>
                            <span class="main-conent-detail-content">{{userInfo.tel}}</span>
                        </el-col>
                        <el-col :sm="24" :md="12" :lg="8">
                            <span class="main-conent-detail-lable">常用快递</span>
                            <span class="main-conent-detail-content">{{userInfo.courier}}</span>
                        </el-col>
                        <el-col :sm="24" :md="12" :lg="8">
                            <span class="main-conent-detail-lable">取货地址</span>
                            <span class="main-conent-detail-content"> {{userInfo.address}}</span>
                        </el-col>
                        <el-col :sm="24" :md="12" :lg="8">
                            <span class="main-conent-detail-lable">备注</span>
                            <span class="main-conent-detail-content"> {{userInfo.remark}}</span>
                        </el-col>
                        
                    </el-row>
                </div>
                <el-divider></el-divider>

                <div class="main-conent-detail">
                    <div class="main-conent-detail-title">退货商品</div>
                    <el-table
                        row-key="id"
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
                    
                </div>
                <el-divider></el-divider>
               

                <div class="main-conent-detail">
                    <div class="main-conent-detail-title">退货进度</div>
                    <el-table
                        row-key="key"
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
                    
                </div>


            </el-card>
               
    </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref, h } from "vue";
import { useStore } from 'vuex';
import { StateType as DetailStateType } from './store';
import { RefundApplicationDataType, ReturnGoodsDataType, ReturnProgressDataType, UserInfoDataType } from './data.d';

interface DetailBasicPageSetupData {
    loading: boolean;
    refundApplication: RefundApplicationDataType;
    userInfo: UserInfoDataType;
    goodsData: ReturnGoodsDataType;
    returnProgress: ReturnProgressDataType;
}

export default defineComponent({
    name: 'DetailBasicPage',
    setup(): DetailBasicPageSetupData {
        const store = useStore<{ DetailBasic: DetailStateType}>();

        // 退款申请 信息
        const refundApplication = computed<RefundApplicationDataType>(() => store.state.DetailBasic.detail.refundApplication);

        // 用户信息
        const userInfo = computed<UserInfoDataType>(() => store.state.DetailBasic.detail.userInfo);

        // 退货商品
        const returnGoods = computed<ReturnGoodsDataType[]>(() => store.state.DetailBasic.detail.returnGoods);
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
        const returnProgress = computed<ReturnProgressDataType[]>(() => store.state.DetailBasic.detail.returnProgress);

        // 读取数据 func
        const loading = ref<boolean>(true);
        const getData = async () => {
            loading.value = true;
            await store.dispatch('DetailBasic/queryDetail');
            loading.value = false;
        }

        onMounted(()=> {
           getData();
        })


        return {
            loading: loading as unknown as boolean,
            refundApplication: refundApplication as unknown as RefundApplicationDataType,
            userInfo: userInfo as unknown as UserInfoDataType,
            goodsData: goodsData as unknown as ReturnGoodsDataType,
            returnProgress: returnProgress as unknown as ReturnProgressDataType,
        }
    }
})
</script>
<style lang="scss" scoped>
.main-conent-detail {
    box-sizing: border-box;
    .main-conent-detail-title {
        margin-bottom: 16px;
        color: #303133;
        font-size: 16px;
        font-weight: 700;
    }
    .main-conent-detail-lable,
    .main-conent-detail-content {
        display: table-cell;
        padding-bottom: 16px;
        line-height: 20px;
        font-size: 14px;
        
    }
    .main-conent-detail-lable {
        white-space: nowrap;
    }
    .main-conent-detail-content {
        width: 100%;
        word-wrap:break-word;
        word-break: break-all;
    }
}
.status {
    padding-left: 20px;
    ::v-deep(.el-badge__content.is-fixed.is-dot) {
        top: 12px;
        left: -8px;        
    }
}
</style>