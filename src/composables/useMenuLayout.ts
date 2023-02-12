import { onBeforeMount, watch, ref, Ref } from "vue";
import { menuLayout, menuLayoutStorageKey } from "@/config/settings";
import { useGlobalStore } from "@/store/global";
import { TMenuLayout } from "@/@types/config.settings";

/**
 * @description:设置 菜单导航布局
 * @author LiQingSong
 */
export const useMenuLayout = (): Ref<TMenuLayout> => {
	const globalStore = useGlobalStore();
	const menuLayoutStorage = (localStorage.getItem(menuLayoutStorageKey) || menuLayout) as TMenuLayout;
	const ml = ref<TMenuLayout>(menuLayoutStorage);

	const setMenuLayout = () => {
		localStorage.setItem(menuLayoutStorageKey, ml.value);
		globalStore.menuLayout = ml.value;
	};

	watch(ml, () => {
		setMenuLayout();
	});

	onBeforeMount(() => {
		setMenuLayout();
	});

	return ml;
};
