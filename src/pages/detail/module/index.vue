<script setup lang="ts">
const tableData = [
	{
		id: "73941",
		name: "七效志张入生",
		barcode: "sn785093140797061",
		price: 8.88,
		num: 3,
	},
	{
		id: "73942",
		name: "七生",
		barcode: "sn785093140797064",
		price: 12.7,
		num: 2,
	},
	{
		id: "73941",
		name: "七效志张入生",
		barcode: "sn785093140797061",
		price: 8.88,
		num: 3,
	},
	{
		id: "73942",
		name: "七生",
		barcode: "sn785093140797064",
		price: 12.7,
		num: 2,
	},
];
const returnProgress = [
	{
		key: 37443,
		time: "1971-08-09 23:51:45",
		rate: "周他好。",
		status: "processing",
		operator: "取货员 ID 1952",
		cost: "5 h",
	},
	{
		key: 79901,
		time: "1980-09-28 16:29:47",
		rate: "非明都己。",
		status: "success",
		operator: "取货员 ID 2803",
		cost: "3 h",
	},
	{
		key: 25814,
		time: "2006-02-01 10:20:11",
		rate: "流争铁展。",
		status: "success",
		operator: "取货员 ID 7129",
		cost: "4 h",
	},
	{
		key: 8524,
		time: "2010-09-08 23:06:07",
		rate: "那布领。",
		status: "processing",
		operator: "取货员 ID 6873",
		cost: "2 h",
	},
	{
		key: 59594,
		time: "2021-10-25 06:30:55",
		rate: "题值革间西。",
		status: "success",
		operator: "取货员 ID 9027",
		cost: "3 h",
	},
];
</script>
<template>
	<el-card shadow="never" style="margin-bottom: 16px">
		<template #header> 退款申请 </template>
		<el-row :gutter="24">
			<el-col :sm="24" :md="12" :lg="8">
				<span class="cell">取货单号：1000000000</span>
			</el-col>
			<el-col :sm="24" :md="12" :lg="8">
				<span class="cell">状态：已取货</span>
			</el-col>
			<el-col :sm="24" :md="12" :lg="8">
				<span class="cell">销售单号：1234123421</span>
			</el-col>
			<el-col :sm="24" :md="12" :lg="8">
				<span class="cell">子订单：3214321432</span>
			</el-col>
		</el-row>
	</el-card>

	<el-card shadow="never" style="margin-bottom: 16px">
		<template #header> 用户信息 </template>
		<el-row :gutter="24">
			<el-col :sm="24" :md="12" :lg="8">
				<span class="cell">用户姓名：Karen Robinson</span>
			</el-col>
			<el-col :sm="24" :md="12" :lg="8">
				<span class="cell">联系电话：13770779817</span>
			</el-col>
			<el-col :sm="24" :md="12" :lg="8">
				<span class="cell">常用快递：宇宙快递</span>
			</el-col>
			<el-col :sm="24" :md="12" :lg="8">
				<span class="cell">取货地址：宇宙地球</span>
			</el-col>
			<el-col :sm="24" :md="12" :lg="8">
				<span class="cell">备注：无</span>
			</el-col>
		</el-row>
	</el-card>

	<el-card shadow="never" style="margin-bottom: 16px">
		<template #header> 退货商品 </template>
		<el-table :data="tableData" show-summary>
			<el-table-column prop="id" label="商品编号" width="180" />
			<el-table-column prop="name" label="商品名称" width="180" />
			<el-table-column prop="barcode" label="商品条码" />
			<el-table-column prop="price" label="单价" />
			<el-table-column prop="num" label="数量（件）" />
		</el-table>
	</el-card>

	<el-card shadow="never" style="margin-bottom: 16px">
		<template #header> 退货进度 </template>

		<el-table row-key="key" :data="returnProgress">
			<el-table-column prop="time" label="时间"> </el-table-column>
			<el-table-column prop="rate" label="当前进度"> </el-table-column>
			<el-table-column prop="status" label="状态">
				<template #default="scope">
					<el-badge class="status" is-dot v-if="scope.row.status === 'success'" type="primary">成功</el-badge>
					<el-badge class="status" is-dot v-else type="success">进行中</el-badge>
				</template>
			</el-table-column>
			<el-table-column prop="operator" label="操作员ID"> </el-table-column>
			<el-table-column prop="cost" label="耗时"> </el-table-column>
		</el-table>
	</el-card>
</template>
<style scoped lang="scss">
.cell {
	line-height: 30px;
}
.status {
	padding-left: 16px;
	/* stylelint-disable-next-line selector-pseudo-element-no-unknown */
	::v-deep(.el-badge__content.is-fixed.is-dot) {
		top: 12px;
		left: -8px;
	}
}
</style>
