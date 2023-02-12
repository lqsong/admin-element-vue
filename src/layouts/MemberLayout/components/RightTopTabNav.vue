<script lang="ts" setup>
import { computed, nextTick, onBeforeMount, onBeforeUnmount, onMounted, ref, toRefs, watch } from "vue";
import { useRouter, useRoute, RouteRecordRaw, RouteLocationNormalizedLoaded } from "vue-router";
import { debounce } from "lodash";
import { IPathKeyRouter } from "@/@types/vue-router";
import { equalTabNavRoute } from "@/utils/router";

import { homePath } from "@/config/settings";

import IconSvg from "@/components/IconSvg/index.vue";

import { useI18n } from "@/composables/useI18n";
import locales from "../locales";

import { useMlRightTopTabNavStore } from "../store/rightTopTabNav";

interface Props {
	routeItem: RouteRecordRaw;
	pathKeyRouter: IPathKeyRouter;
}

const props = withDefaults(defineProps<Props>(), {});

const { routeItem, pathKeyRouter } = toRefs(props);

const t = useI18n(locales);

const router = useRouter();
const route = useRoute();

const mlRightTopTabNavStore = useMlRightTopTabNavStore();
// 初始化默认值pathKeyRouter
const setPathKeyRouter = () => {
	mlRightTopTabNavStore.pathKeyRouter = pathKeyRouter.value;
};
watch(pathKeyRouter, () => {
	setPathKeyRouter();
});
onBeforeMount(() => {
	setPathKeyRouter();
});
const tabNavListLen = computed<number>(() => mlRightTopTabNavStore.tabNavList.length);

// tabnav-box - x位置值
const translateX = ref<number>(0);
const scrollBox = ref<HTMLDivElement>();
const scrollContent = ref<HTMLDivElement>();
const translateXLeftMaxVal = ref<number>(0);

// tabnav-box - 滚动鼠标滚轮- 滑动box
const handleScroll = (offset: number): void => {
	const boxWidth = scrollBox.value ? scrollBox.value.clientWidth : 0;
	const contentWidth = scrollContent.value ? scrollContent.value.clientWidth : 0;
	if (offset > 0) {
		translateX.value = Math.min(0, translateX.value + offset);
	} else {
		if (boxWidth < contentWidth) {
			if (translateX.value >= -(contentWidth - boxWidth)) {
				translateX.value = Math.max(translateX.value + offset, boxWidth - contentWidth);
			}
		} else {
			translateX.value = 0;
		}
	}
};

// 鼠标在tabNav上滚动事件
const handleRolling = (e: any) => {
	e.preventDefault();
	const type = e.type;
	let delta = 0;
	if (type === "DOMMouseScroll" || type === "mousewheel") {
		delta = e.wheelDelta ? e.wheelDelta : -(e.detail || 0) * 40;
	}
	handleScroll(delta);
};

// navItem - 滑动到对应位置
const moveToView = (index: number): void => {
	const itemDom: any = scrollContent.value?.children[index];
	if (!itemDom) {
		return;
	}
	const boxWidth = scrollBox.value ? scrollBox.value.clientWidth : 0;
	const contentWidth = scrollContent.value ? scrollContent.value.clientWidth : 0;
	const itemOffsetLeft = itemDom.offsetLeft;
	const itemClientWidth = itemDom.clientWidth + 1;
	// console.log("width", boxWidth, contentWidth, itemOffsetLeft, itemClientWidth, translateX.value);

	translateXLeftMaxVal.value = boxWidth - contentWidth; // 设置向左最大滚动距离

	if (contentWidth < boxWidth || itemOffsetLeft === 0) {
		// console.log("moveToView 1");
		// 所有item的集合长度小于box宽度或者当前是第一个item
		translateX.value = 0;
	} else if (itemOffsetLeft < -translateX.value) {
		// console.log("moveToView 2");
		// 标签在可视区域左侧
		translateX.value = -itemOffsetLeft;
	} else if (itemOffsetLeft > -translateX.value && itemOffsetLeft + itemClientWidth < -translateX.value + boxWidth) {
		// console.log("moveToView 3");
		// 标签在可视区域
		translateX.value = Math.min(0, boxWidth - itemClientWidth - itemOffsetLeft);
	} else {
		// console.log("moveToView 4", itemOffsetLeft);
		// 标签在可视区域右侧
		translateX.value = -(itemOffsetLeft - (boxWidth - itemClientWidth));
	}
};

// navItem - 点击跳转
const clickTabNavItem = (to: RouteLocationNormalizedLoaded) => {
	router.push(to);
};

// 设置tabNav
const setTabNavList = () => {
	const index = mlRightTopTabNavStore.setTabNavList(route, routeItem.value);
	if (typeof index !== "undefined") {
		nextTick(() => {
			moveToView(index || 0);
		});
	}
};

// 关闭当前tabNav
const closeCurrentTabNav = (item: RouteLocationNormalizedLoaded, index: number): void => {
	if (item.meta.tabNavCloseBefore && typeof item.meta.tabNavCloseBefore === "function") {
		item.meta.tabNavCloseBefore(() => {
			mlRightTopTabNavStore.closeTabNav(item, index, router);
		});
	} else {
		mlRightTopTabNavStore.closeTabNav(item, index, router);
	}
};

// 下拉菜单操作
const handleTabNavDropdown = async (command: string) => {
	switch (command) {
		case "refreshCurrent":
			// 刷新当前
			mlRightTopTabNavStore.refreshCurrentTabNav(router);
			break;
		case "closeOther":
			// 关闭其他
			mlRightTopTabNavStore.closeOtherTabNav(router);
			break;
		case "closeAll":
			// 关闭所有
			mlRightTopTabNavStore.closeAllTabNav(router);
			break;
		case "closeToLeft":
			// 关闭至左侧
			mlRightTopTabNavStore.closeToLRTabNav("left", router);
			break;
		case "closeToRight":
			// 关闭至右侧
			mlRightTopTabNavStore.closeToLRTabNav("right", router);
			break;
		default:
			break;
	}
};

// 监听路由和当前路由对应的routeItem
watch([route, routeItem], () => {
	setTabNavList();
});

// 浏览器 resize
const resizeHandler = debounce(() => {
	setTimeout(() => {
		setTabNavList();
	}, 200);
}, 100);
// 初始化
onMounted(() => {
	setTabNavList();

	// 浏览器 resize - 添加
	window.addEventListener("resize", resizeHandler);
});
// 组件注销前置
onBeforeUnmount(() => {
	window.removeEventListener("resize", resizeHandler);
});
</script>

<template>
	<div class="member-layout-right-tabnav">
		<div v-if="translateX >= 0" class="member-layout-right-tabnav-icon disabled">
			<IconSvg name="arrow-left" />
		</div>
		<div v-else class="member-layout-right-tabnav-icon" @click="handleScroll(200)">
			<IconSvg name="arrow-left" />
		</div>

		<div
			class="member-layout-right-tabnav-box"
			ref="scrollBox"
			@DOMMouseScroll="handleRolling"
			@mousewheel="handleRolling"
		>
			<div
				class="member-layout-right-tabnav-item-box"
				ref="scrollContent"
				:style="{ transform: `translateX(${translateX}px)` }"
			>
				<template v-for="(item, index) in mlRightTopTabNavStore.tabNavList" :key="`tab-nav-${index}`">
					<div
						v-if="equalTabNavRoute(item, route, route.meta?.tabNavType)"
						class="member-layout-right-tabnav-item active"
					>
						<el-dropdown trigger="contextmenu" @command="handleTabNavDropdown">
							<div class="item-box">
								<span class="text">{{ t(item.meta.title || "") }}</span>
								<span v-if="item.path !== homePath" class="icon" @click.stop="closeCurrentTabNav(item, index)">
									<IconSvg name="close" />
								</span>
							</div>
							<template #dropdown>
								<el-dropdown-menu>
									<el-dropdown-item command="refreshCurrent">刷新当前页</el-dropdown-item>
									<el-dropdown-item command="closeToLeft" :disabled="index < 2">关闭至左侧 </el-dropdown-item>
									<el-dropdown-item command="closeToRight" :disabled="index === tabNavListLen - 1">
										关闭至右侧
									</el-dropdown-item>
									<el-dropdown-item
										command="closeOther"
										:disabled="tabNavListLen === 1 || (tabNavListLen === 2 && item.path !== homePath)"
									>
										关闭其他
									</el-dropdown-item>
									<el-dropdown-item command="closeAll" :disabled="tabNavListLen === 1">关闭所有</el-dropdown-item>
								</el-dropdown-menu>
							</template>
						</el-dropdown>
					</div>
					<div v-else class="member-layout-right-tabnav-item" @click="clickTabNavItem(item)">
						<div class="item-box">
							<span class="text">{{ t(item.meta.title || "") }}</span>
							<span v-if="item.path !== homePath" class="icon" @click.stop="closeCurrentTabNav(item, index)">
								<IconSvg name="close" />
							</span>
						</div>
					</div>
				</template>
			</div>
		</div>
		<div v-if="translateXLeftMaxVal >= translateX" class="member-layout-right-tabnav-icon disabled">
			<IconSvg name="arrow-right" />
		</div>
		<div v-else class="member-layout-right-tabnav-icon" @click="handleScroll(-200)">
			<IconSvg name="arrow-right" />
		</div>
		<el-dropdown @command="handleTabNavDropdown">
			<div class="member-layout-right-tabnav-icon">
				<IconSvg name="more" />
			</div>
			<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item command="refreshCurrent">刷新当前页</el-dropdown-item>
					<el-dropdown-item
						command="closeOther"
						:disabled="tabNavListLen === 1 || (tabNavListLen === 2 && route.path !== homePath)"
						>关闭其他</el-dropdown-item
					>
					<el-dropdown-item command="closeAll" :disabled="tabNavListLen === 1">关闭所有</el-dropdown-item>
				</el-dropdown-menu>
			</template>
		</el-dropdown>
	</div>
</template>
