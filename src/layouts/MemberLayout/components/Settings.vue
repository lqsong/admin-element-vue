<script lang="ts" setup>
import { ref } from "vue";
import IconSvg from "@/components/IconSvg/index.vue";
import { useTheme } from "@/composables/useTheme";
import { useMenuLayout } from "@/composables/useMenuLayout";
import { useMenuStyle } from "@/composables/useMenuStyle";
import { useGlobalStore } from "@/store/global";

interface Props {
	customClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
	customClass: "",
});

const globalStore = useGlobalStore();

const drawer = ref(false);
const isDark = useTheme();
const menuLayout = useMenuLayout();
const menuStyle = useMenuStyle();
</script>

<template>
	<span :class="props.customClass" @click="drawer = true">
		<IconSvg name="theme" />
		<el-drawer v-model="drawer" :with-header="false" size="280">
			<div class="setting">
				<el-divider>主题模式</el-divider>
				<div class="theme-box">
					<el-tooltip content="明亮" placement="top">
						<div class="theme-item" :class="{ 'is-active': !isDark }" @click="isDark = false">
							<div class="theme-item-content">
								<IconSvg name="sun" />
							</div>
						</div>
					</el-tooltip>
					<el-tooltip content="暗黑" placement="top">
						<div class="theme-item" :class="{ 'is-active': isDark }" @click="isDark = true">
							<div class="theme-item-content dark">
								<IconSvg name="moon" />
							</div>
						</div>
					</el-tooltip>
				</div>

				<el-divider>导航布局</el-divider>
				<div class="nav-box">
					<el-tooltip content="纵向" placement="top">
						<div
							class="nav-box-item nav-vertical"
							:class="{ 'is-active': menuLayout === 'vertical' }"
							@click="menuLayout = 'vertical'"
						>
							<div class="nav-box-item-nav"></div>
							<div class="nav-box-item-box">
								<div class="nav-box-item-light"></div>
								<div class="nav-box-item-content"></div>
							</div>
						</div>
					</el-tooltip>
					<el-tooltip content="横向" placement="top">
						<div
							class="nav-box-item nav-horizontal"
							:class="{ 'is-active': menuLayout === 'horizontal' }"
							@click="menuLayout = 'horizontal'"
						>
							<div class="nav-box-item-nav"></div>
							<div class="nav-box-item-content"></div>
						</div>
					</el-tooltip>
				</div>

				<el-divider>导航风格</el-divider>
				<div class="nav-box">
					<template v-if="menuLayout === 'vertical'">
						<template v-if="isDark">
							<el-tooltip content="明亮" placement="top">
								<div class="nav-box-item nav-vertical is-disable" :class="{ 'is-active': menuStyle === 'light' }">
									<div class="nav-box-item-nav is-light"></div>
									<div class="nav-box-item-box">
										<div class="nav-box-item-light"></div>
										<div class="nav-box-item-content"></div>
									</div>
								</div>
							</el-tooltip>
							<el-tooltip content="暗黑" placement="top">
								<div class="nav-box-item nav-vertical is-disable" :class="{ 'is-active': menuStyle === 'dark' }">
									<div class="nav-box-item-nav"></div>
									<div class="nav-box-item-box">
										<div class="nav-box-item-light"></div>
										<div class="nav-box-item-content"></div>
									</div>
								</div>
							</el-tooltip>
						</template>
						<template v-else>
							<el-tooltip content="明亮" placement="top">
								<div
									class="nav-box-item nav-vertical"
									:class="{ 'is-active': menuStyle === 'light' }"
									@click="menuStyle = 'light'"
								>
									<div class="nav-box-item-nav is-light"></div>
									<div class="nav-box-item-box">
										<div class="nav-box-item-light"></div>
										<div class="nav-box-item-content"></div>
									</div>
								</div>
							</el-tooltip>
							<el-tooltip content="暗黑" placement="top">
								<div
									class="nav-box-item nav-vertical"
									:class="{ 'is-active': menuStyle === 'dark' }"
									@click="menuStyle = 'dark'"
								>
									<div class="nav-box-item-nav"></div>
									<div class="nav-box-item-box">
										<div class="nav-box-item-light"></div>
										<div class="nav-box-item-content"></div>
									</div>
								</div>
							</el-tooltip>
						</template>
					</template>
					<template v-else>
						<template v-if="isDark">
							<el-tooltip content="明亮" placement="top">
								<div class="nav-box-item nav-horizontal is-disable" :class="{ 'is-active': menuStyle === 'light' }">
									<div class="nav-box-item-nav is-light"></div>
									<div class="nav-box-item-content"></div>
								</div>
							</el-tooltip>
							<el-tooltip content="暗黑" placement="top">
								<div class="nav-box-item nav-horizontal is-disable" :class="{ 'is-active': menuStyle === 'dark' }">
									<div class="nav-box-item-nav"></div>
									<div class="nav-box-item-content"></div>
								</div>
							</el-tooltip>
						</template>
						<template v-else>
							<el-tooltip content="明亮" placement="top">
								<div
									class="nav-box-item nav-horizontal"
									:class="{ 'is-active': menuStyle === 'light' }"
									@click="menuStyle = 'light'"
								>
									<div class="nav-box-item-nav is-light"></div>
									<div class="nav-box-item-content"></div>
								</div>
							</el-tooltip>
							<el-tooltip content="暗黑" placement="top">
								<div
									class="nav-box-item nav-horizontal"
									:class="{ 'is-active': menuStyle === 'dark' }"
									@click="menuStyle = 'dark'"
								>
									<div class="nav-box-item-nav"></div>
									<div class="nav-box-item-content"></div>
								</div>
							</el-tooltip>
						</template>
					</template>
				</div>

				<el-divider>界面设置</el-divider>
				<div class="li-item">
					<span>多标签Tab页</span>
					<el-switch size="small" v-model="globalStore.isTabsNav" />
				</div>
				<div class="li-item">
					<span>页脚</span>
					<el-switch size="small" v-model="globalStore.isLayoutFooter" />
				</div>
			</div>
		</el-drawer>
	</span>
</template>
<style lang="scss" scoped>
.setting {
	display: flex;
	flex-direction: column;
	.nav-box {
		position: relative;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		.nav-box-item {
			position: relative;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			width: 90px;
			height: 65px;
			padding: 6px;
			margin-bottom: 20px;
			cursor: pointer;
			background-color: var(--ft-color-white-1);
			border-radius: 5px;
			box-shadow: 0 0 0 2px var(--ft-color-white-1);
			transition: all 0.2s;
			.nav-box-item-nav {
				background-color: var(--ft-color-black-primary-1);
				border-radius: 3px;
				&.is-light {
					background-color: #ffffff;
				}
			}
			.nav-box-item-light {
				background-color: #ffffff;
				border-radius: 3px;
			}
			.nav-box-item-content {
				background-color: #ffffff;
				border-radius: 3px;
			}
			.nav-box-item-box {
				display: flex;
				justify-content: space-between;
			}

			/* 纵向 */
			&.nav-vertical {
				flex-direction: row;
				.nav-box-item-nav {
					width: 20%;
				}
				.nav-box-item-light {
					height: 20%;
				}
				.nav-box-item-content {
					height: 67%;
				}
				.nav-box-item-box {
					flex-direction: column;
					width: 72%;
				}
			}

			/* 横向 */
			&.nav-horizontal {
				flex-direction: column;
				.nav-box-item-nav {
					height: 20%;
				}
				.nav-box-item-content {
					height: 67%;
				}
			}

			/* 选中 */
			&.is-active {
				box-shadow: 0 0 0 2px var(--ft-color-primary) !important;
				&::before {
					position: absolute;
					right: 10px;
					bottom: 10px;
					display: flex;
					align-items: center;
					justify-content: center;
					width: 16px;
					height: 16px;
					font-size: 10px;
					color: #ffffff;
					content: "✔";
					background-color: var(--ft-color-primary);
					border-radius: 10px;
				}
			}

			/* 禁用 */
			&.is-disable {
				cursor: not-allowed;
				opacity: 0.5;
			}
		}
	}

	/* 主题模式 */
	.theme-box {
		position: relative;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		.theme-item {
			position: relative;
			box-sizing: border-box;
			display: flex;
			width: 90px;
			height: 65px;
			padding: 6px;
			margin-bottom: 20px;
			cursor: pointer;
			background-color: var(--ft-color-white-1);
			border-radius: 5px;
			box-shadow: 0 0 0 2px var(--ft-color-white-1);
			transition: all 0.2s;
			.theme-item-content {
				display: flex;
				flex: 1;
				align-items: center;
				justify-content: center;
				font-size: 20px;
				color: var(--ft-color-black-2);
				background-color: #ffffff;
				border-radius: 3px;
				&.dark {
					color: #ffffff;
					background-color: var(--ft-color-black-primary-1);
				}
			}

			/* 选中 */
			&.is-active {
				box-shadow: 0 0 0 2px var(--ft-color-primary) !important;
				&::before {
					position: absolute;
					right: 10px;
					bottom: 10px;
					display: flex;
					align-items: center;
					justify-content: center;
					width: 16px;
					height: 16px;
					font-size: 10px;
					color: #ffffff;
					content: "✔";
					background-color: var(--ft-color-primary);
					border-radius: 10px;
				}
			}
		}
	}

	/* 其他 */
	.li-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 10px;
		color: var(--ft-text-color);
	}
}
</style>
