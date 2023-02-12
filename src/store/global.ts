/**
 * @description: 全局 store
 * @author LiQingSong
 */
import { defineStore } from "pinia";
import { theme, menuLayout, menuStyle, isTabsNav, isLayoutFooter } from "@/config/settings";
import { TTheme, TMenuLayout, TMenuStyle } from "@/@types/config.settings";

// state ts类型
export interface IGlobalState {
	/* 以下是针对所有 Layout 扩展字段 */
	// 左侧展开收起
	collapsed: boolean;
	// 模板主题
	theme: TTheme;

	/* 以下是针对 MemberLayout 扩展字段 */
	// 菜单导航布局
	menuLayout: TMenuLayout;
	// 菜单导航风格
	menuStyle: TMenuStyle;
	// 是否启用多标签Tab页
	isTabsNav: boolean;
	// 是否启用底部
	isLayoutFooter: boolean;
}

export const useGlobalStore = defineStore("useGlobalStore", {
	state: (): IGlobalState => {
		return {
			collapsed: false,
			theme: theme,
			menuLayout: menuLayout,
			menuStyle: menuStyle,
			isTabsNav: isTabsNav,
			isLayoutFooter: isLayoutFooter,
		};
	},
	getters: {},
	actions: {},
});
