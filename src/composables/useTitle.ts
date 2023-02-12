import { ComputedRef, onMounted, watch } from "vue";
import { RouteRecordRaw } from "vue-router";
import { siteTitle } from "@/config/settings";
import { TUseFormat } from "@/@types/i18n";

/**
 * @description:设置 html Title  composables
 * @param routeItem 当前路由item
 * @author LiQingSong
 */
export const useTitle = (
	routeItem: ComputedRef<RouteRecordRaw>,
	t: (key: string, format?: TUseFormat | undefined) => string = (key: string) => key,
): void => {
	const setTitle = (title: string): void => {
		document.title = `${t(title)} - ${siteTitle}`;
	};

	watch(routeItem, () => {
		setTitle(routeItem.value?.meta?.title || "");
	});

	onMounted(() => {
		setTitle(routeItem.value?.meta?.title || "");
	});
};
