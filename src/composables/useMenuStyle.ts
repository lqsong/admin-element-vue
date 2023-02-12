import { onBeforeMount, watch, ref, Ref } from "vue";
import { menuStyle, menuStyleStorageKey } from "@/config/settings";
import { useGlobalStore } from "@/store/global";
import { TMenuStyle } from "@/@types/config.settings";

/**
 * @description:设置 菜单导航风格
 * @author LiQingSong
 */
export const useMenuStyle = (): Ref<TMenuStyle> => {
	const globalStore = useGlobalStore();
	const menuStyleStorage = (localStorage.getItem(menuStyleStorageKey) || menuStyle) as TMenuStyle;
	const ms = ref<TMenuStyle>(menuStyleStorage);

	const setMenuStyle = () => {
		localStorage.setItem(menuStyleStorageKey, ms.value);
		globalStore.menuStyle = ms.value;
	};

	watch(ms, () => {
		setMenuStyle();
	});

	onBeforeMount(() => {
		setMenuStyle();
	});

	return ms;
};
