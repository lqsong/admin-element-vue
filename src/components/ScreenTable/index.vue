<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref, nextTick } from "vue";
import { ElTable } from "element-plus";
import { debounce } from "lodash";
import IconSvg from "@/components/IconSvg/index.vue";
import { useI18n } from "@/composables/useI18n";
import { IPaginationConfig, IPopoverTableColumnItem, IDefineExpose } from "./data.d";
interface IPorps {
	rowKey: string;
	data: any[];
	loading: boolean;
	pagination?: IPaginationConfig;
	showHeader?: boolean;
	stripe?: boolean;
	border?: boolean;
	size?: any; // "" | "default" | "small" | "large"
	tableClass?: string;
	headerRowClassName?: string;
	// 是否显示设置按钮
	settingBtnShow?: boolean;
	// 是否显示高级搜索
	searchShow?: boolean;
	// 是否显示表格列保存按钮
	columnSubmitBtnShow?: boolean;
	// 表格列保存按钮Loading
	columnSubmitBtnLoading?: boolean;
	// 搜索标题
	searchTitle?: string;
	// 搜索区域的宽
	searchWidth?: string;
	// 搜索是否Drawer形式，默认值
	searchcDrawerDefault?: boolean;
	// 搜索项已填写的字段数
	searchFieldTotal?: number;
	// 表格列popover中的项
	popoverColumn?: IPopoverTableColumnItem[];
}
const props = withDefaults(defineProps<IPorps>(), {
	showHeader: true,
	stripe: false,
	border: true,
	size: "",
	tableClass: "",
	headerRowClassName: "ft-el-table-header",
	settingBtnShow: false,
	searchShow: false,
	columnSubmitBtnShow: true,
	columnSubmitBtnLoading: false,
	searchTitle: "高级搜索",
	searchWidth: "270px",
	searchcDrawerDefault: true,
	searchFieldTotal: 0,
	popoverColumn: () => {
		return [];
	},
});

const emit = defineEmits<{
	/**
	 * 点击搜索锁定事件
	 * @param value 是否用Drawer，这里需要注意，用Drawer是true,不用是false，和是否锁定相反
	 */
	(e: "clickSearchLock", value: boolean): void;
	/**
	 * 全选/不全选展示表格列事件
	 * @param data props.popoverColumn 数据
	 * @param value 是否全选 true false
	 */
	(e: "clickPopoverColumnAll", data: IPopoverTableColumnItem[], value: boolean): void;
	/**
	 * 单选展示表格某列事件
	 * @param item 当前点击列的item
	 * @param index 当前点击列在data中的下标
	 * @param data props.popoverColumn 数据
	 * @param value 是否显示 true false
	 */
	(
		e: "clickPopoverColumn",
		item: IPopoverTableColumnItem,
		index: number,
		data: IPopoverTableColumnItem[],
		value: boolean,
	): void;
	/**
	 * 点击保存表格列事件
	 * @param data props.popoverColumn 数据
	 */
	(e: "clickPopoverColumnSubmit", data: IPopoverTableColumnItem[]): void;
}>();
const t = useI18n();

const conentRef = ref<HTMLDivElement>();
const tableRef = ref<InstanceType<typeof ElTable>>();
const tableHeight = ref<number>(200);

const resizeHandler = debounce(() => {
	if (conentRef.value) {
		tableHeight.value = conentRef.value.offsetHeight;
	}
}, 100);

onMounted(() => {
	resizeHandler();
	window.addEventListener("resize", resizeHandler);
});

onBeforeUnmount(() => {
	window.removeEventListener("resize", resizeHandler);
});

/* column Popover */
const popoverRef = ref();

/* 高级搜索 */
// 搜索是否Drawer形式
const searchcDrawer = ref(props.searchcDrawerDefault);
const searchcDrawerOnLock = () => {
	searchcDrawer.value = !searchcDrawer.value;
	emit("clickSearchLock", searchcDrawer.value);

	// 隐藏popover
	popoverRef.value.hide();

	// 重置表格布局
	nextTick(() => {
		tableRef.value?.doLayout();
	});
};
// searchcDrawervisible
const searchDrawerVisible = ref(false);
const onSearchcDrawerShow = () => {
	searchDrawerVisible.value = true;
};

/* 表格列配置 */
// 有多少个列
const popoverColumnLen = computed(() => props.popoverColumn.length);
// 全选列
const popoverColumnAll = ref(false);
const popoverColumnAllDisabled = ref(false);
// 全选列 - change事件
const popoverColumnAllChange = (v: any) => {
	popoverColumnAllDisabled.value = true;
	if (v === true) {
		props.popoverColumn.forEach((item) => {
			if (!item.disabled) {
				item.checked = true;
			}
		});
	} else {
		props.popoverColumn.forEach((item) => {
			if (!item.disabled) {
				item.checked = false;
			}
		});
	}
	popoverColumnAllDisabled.value = false;

	emit("clickPopoverColumnAll", props.popoverColumn, v);

	// 重置表格布局
	nextTick(() => {
		tableRef.value?.doLayout();
	});
};
// 全选列 - checkbox值赋值 - 方法
const setPopoverColumnAllVal = () => {
	let bool = true;
	const len = props.popoverColumn.length;
	for (let index = 0; index < len; index++) {
		const element = props.popoverColumn[index];
		if (element.checked === false) {
			bool = false;
			break;
		}
	}
	popoverColumnAll.value = bool;
};
onMounted(() => {
	// 初始化设置全选值
	setPopoverColumnAllVal();
});
// 单选某列
const popoverColumnChange = (v: any, item: IPopoverTableColumnItem, index: number) => {
	// console.log('popoverColumnChange', v, item, props.popoverColumn);
	emit("clickPopoverColumn", item, index, props.popoverColumn, v);
	// 全选checkbox值赋值
	if (v === true) {
		setPopoverColumnAllVal();
	} else {
		popoverColumnAll.value = false;
	}

	// 重置表格布局
	nextTick(() => {
		tableRef.value?.doLayout();
	});
};

// 点击保存表格列事件
const popoverColumnSubmit = () => {
	emit("clickPopoverColumnSubmit", props.popoverColumn);
};
/**
 * 暴露事件 - 设置搜索Drawer是否显示
 * @param v 是否显示 true false
 */
const setSearchDrawerVisible = (v: boolean) => {
	searchDrawerVisible.value = v;
};
// 暴露方法
defineExpose<IDefineExpose>({
	setSearchDrawerVisible,
	setPopoverColumnAllVal,
});
</script>
<template>
	<div class="main-conent-screen" :style="`--table-height:${tableHeight}px`">
		<div class="main-conent-screen-left">
			<div v-if="$slots.headerTab" class="screen-tab">
				<slot name="headerTab"></slot>
			</div>
			<div v-if="$slots.header" class="screen-header">
				<div class="screen-header-left">
					<slot name="header"></slot>
				</div>
				<div v-if="props.searchShow || popoverColumnLen > 0" class="screen-header-right">
					<el-button
						v-if="searchcDrawer && props.searchShow"
						@click="onSearchcDrawerShow"
						class="screen-table-search-btn"
					>
						{{ props.searchTitle }}<span v-if="props.searchFieldTotal > 0">({{ props.searchFieldTotal }})</span>
					</el-button>
					<el-popover
						v-if="props.settingBtnShow"
						:width="200"
						ref="popoverRef"
						placement="bottom-end"
						:show-arrow="false"
						:teleported="false"
						popper-class="screen-table-search-set-popper"
					>
						<template #reference>
							<div class="screen-table-set">
								<IconSvg name="set" />
							</div>
						</template>
						<template #default>
							<div v-if="props.searchShow" class="screen-table-set-search">
								<div class="screen-table-set-search-left">{{ props.searchTitle }}</div>
								<div class="screen-table-set-search-right">
									<span class="screen-table-set-icon-lock" @click="searchcDrawerOnLock">
										<el-tooltip v-if="searchcDrawer" content="点击锁定" placement="top">
											<IconSvg class="icon" name="unlock" />
										</el-tooltip>
										<el-tooltip v-else content="点击解锁" placement="top">
											<IconSvg class="icon" name="lock" />
										</el-tooltip>
									</span>
								</div>
							</div>
							<template v-if="popoverColumnLen > 0">
								<div class="screen-table-set-item all">
									<div class="screen-table-set-item-left">表格列配置</div>
									<div class="screen-table-set-item-right">
										<el-tooltip :content="popoverColumnAll ? '点击全部隐藏' : '点击全部展示'" placement="left">
											<el-checkbox
												size="large"
												v-model="popoverColumnAll"
												@change="popoverColumnAllChange"
												:disabled="popoverColumnAllDisabled"
											/>
										</el-tooltip>
										<el-button
											v-if="props.columnSubmitBtnShow"
											class="btn"
											type="primary"
											size="small"
											:loading="props.columnSubmitBtnLoading"
											@click="popoverColumnSubmit"
										>
											保存
										</el-button>
									</div>
								</div>
								<div class="screen-table-set-box">
									<div v-for="(item, index) in props.popoverColumn" :key="index" class="screen-table-set-item">
										<div class="screen-table-set-item-left">{{ item.label }}</div>
										<div class="screen-table-set-item-right">
											<el-switch
												size="small"
												v-model="item.checked"
												:disabled="item.disabled"
												@change="(v) => popoverColumnChange(v, item, index)"
											/>
										</div>
									</div>
								</div>
							</template>
						</template>
					</el-popover>
				</div>
			</div>
			<div v-if="$slots.tab" class="screen-tab">
				<slot name="tab"></slot>
			</div>
			<div v-if="!$slots.header && !$slots.tab" class="screen-padding" />

			<div class="screen-conent" ref="conentRef">
				<div class="screen-conent-box">
					<el-table
						ref="tableRef"
						:height="tableHeight"
						:row-key="props.rowKey"
						:data="props.data"
						v-loading="props.loading"
						:show-header="props.showHeader"
						:stripe="props.stripe"
						:border="props.border"
						:size="props.size"
						:class="props.tableClass"
						:header-row-class-name="props.headerRowClassName"
					>
						<slot></slot>
						<template #empty>
							<slot v-if="$slots.empty" name="empty"></slot>
							<span v-else>{{ t("app.global.nodata") }}</span>
						</template>
					</el-table>
				</div>
			</div>

			<div v-if="pagination" class="screen-footer">
				<el-pagination
					background
					:page-sizes="pagination.sizes || [20, 50, 100]"
					:page-size="pagination.pageSize"
					@size-change="pagination?.sizeChange"
					:layout="pagination.layout || 'total, prev, pager, next'"
					:total="pagination.total"
					:current-page="pagination.current"
					@current-change="pagination?.onChange"
				>
				</el-pagination>
			</div>
			<div v-else class="screen-padding" />
		</div>
		<div v-if="$slots.search && !searchcDrawer" class="main-conent-screen-right" :style="{ width: props.searchWidth }">
			<div class="main-conent-screen-right-title">
				<span class="line"></span>
				<span class="text">{{ props.searchTitle }}</span>
			</div>
			<div class="main-conent-screen-right-content">
				<div class="main-conent-screen-right-content-box">
					<slot name="search"></slot>
				</div>
			</div>
		</div>

		<el-drawer
			v-if="$slots.search && searchcDrawer"
			class="screen-table-search-drawer"
			v-model="searchDrawerVisible"
			size="270px"
			append-to-body
			:title="props.searchTitle"
		>
			<div class="body-box">
				<slot name="search"></slot>
			</div>
		</el-drawer>
	</div>
</template>
<style lang="scss">
/* popper class */
.screen-table-search-set-popper {
	--el-popover-padding: 0;

	position: relative;
	display: flex;
	flex-direction: column;
	max-height: 400px;
	max-height: var(--table-height);
	overflow: hidden;

	/* popper search box */
	.screen-table-set-search,
	.screen-table-set-item {
		display: flex;
		flex-shrink: 0;
		align-items: center;
		justify-content: space-between;
		height: 30px;
		padding: 0 12px;
		font-size: 12px;
		background-color: var(--ft-card-bg-color);
		.screen-table-set-item-right {
			display: flex;
			align-items: center;
			height: 30px;
		}
		&.all {
			border-top: 1px solid #dcdfe6;
			border-bottom: 1px solid #f4f4f5;
			.screen-table-set-item-right {
				.btn {
					height: 20px !important;
					padding: 2px 6px !important;
					margin-left: 8px;
				}
			}
		}
	}

	/* popper search table column box */
	.screen-table-set-box {
		position: relative;
		box-sizing: border-box;
		flex: 1;
		overflow: hidden;
		overflow-y: auto;
	}
}

/* drawer class */
.screen-table-search-drawer {
	.body-box {
		position: absolute;
		top: 74px;
		right: 0;
		bottom: 0;
		left: 0;
		display: flex;
		flex-direction: column;
		overflow: auto;
	}
}
</style>
<style lang="scss" scoped>
/* icon 锁 */
.screen-table-set-icon-lock {
	font-size: 16px;
	cursor: pointer;
	.icon {
		outline: none;
	}
}
.main-conent-screen {
	display: flex;
	flex-direction: row;
	height: calc(100%);
	.main-conent-screen-left {
		position: relative;
		display: flex;
		flex: 1;
		flex-direction: column;
		background-color: var(--ft-card-bg-color);
		border-radius: 4px;

		// box-shadow: 0 0 5px 0 rgb(0 0 0 / 15%);
		.screen-header {
			display: flex;
			flex-direction: row;
			min-height: 32px;
			padding: 16px;
			.screen-header-left {
				flex: 1;
			}
			.screen-header-right {
				z-index: 20;
				display: flex;
				flex-direction: row;
				align-items: flex-start;
				padding-left: 16px;
				.screen-table-search-btn {
					margin-right: 10px;
				}
				.screen-table-set {
					box-sizing: border-box;
					display: flex;
					align-items: center;
					justify-content: center;
					width: 32px;
					height: 32px;
					color: var(--el-text-color-regular);
					text-align: center;
					cursor: pointer;
					border: var(--el-border);
					border-color: var(--el-border-color);
					border-radius: var(--el-border-radius-base);
					outline: none;
					&:hover,
					&:focus {
						color: var(--el-color-primary);
						background-color: var(--el-color-primary-light-9);
						border-color: var(--el-color-primary-light-7);
						outline: none;
					}
				}
			}
		}
		.screen-tab {
			padding: 0 16px;
		}
		.screen-footer {
			min-height: 32px;
			padding: 16px;
			text-align: right;
			/* stylelint-disable-next-line selector-pseudo-element-no-unknown */
			::v-deep(.el-pagination) {
				justify-content: flex-end;
			}
		}
		.screen-conent {
			position: relative;
			flex: 1;
			padding: 0 16px;
			overflow: hidden;
			.screen-conent-box {
				position: absolute;
				top: 0;
				right: 16px;
				bottom: 0;
				left: 16px;
				overflow: hidden;
			}
		}
		.screen-padding {
			padding-top: 20px;
		}
	}
	.main-conent-screen-right {
		position: relative;
		display: flex;
		flex-direction: column;
		width: 270px;
		margin-left: 10px;
		overflow: hidden;
		background-color: var(--ft-card-bg-color);
		border-radius: 4px;

		// box-shadow: 0 0 5px 0 rgb(0 0 0 / 15%);
		.main-conent-screen-right-title {
			display: flex;
			flex-direction: row;
			align-items: center;
			height: 60px;
			font-size: 16px;
			color: var(--el-text-color-regular);
			.line {
				width: 4px;
				height: 26px;
				margin: 0 10px 0 16px;
				background-color: var(--el-color-primary);
			}
		}
		.main-conent-screen-right-content {
			position: relative;
			flex: 1;
			.main-conent-screen-right-content-box {
				position: absolute;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				display: flex;
				flex-direction: column;
				overflow: auto;
			}
		}
	}
}
</style>
