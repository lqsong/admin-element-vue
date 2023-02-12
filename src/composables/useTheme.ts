import { onBeforeMount, watch, ref, Ref } from "vue";
import { theme, themeStorageKey } from "@/config/settings";
import { useGlobalStore } from "@/store/global";

/**
 * @description:设置 模板主题
 * @author LiQingSong
 */
export const useTheme = (): Ref<boolean> => {
	const globalStore = useGlobalStore();
	const themeStorage = localStorage.getItem(themeStorageKey) || theme;
	const isDark = ref(themeStorage === "dark");

	const setDark = () => {
		if (isDark.value === true) {
			localStorage.setItem(themeStorageKey, "dark");
			document.querySelector("html")?.classList.add("dark");
			globalStore.theme = "dark";
		} else {
			localStorage.setItem(themeStorageKey, "light");
			document.querySelector("html")?.classList.remove("dark");
			globalStore.theme = "light";
		}
	};

	watch(isDark, () => {
		setDark();
	});

	onBeforeMount(() => {
		setDark();
	});

	return isDark;
};
