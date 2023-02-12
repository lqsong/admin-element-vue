<script lang="ts" setup>
import { TI18nKey } from "@/@types/i18n";
import IconSvg from "@/components/IconSvg/index.vue";
import { setLocale } from "@/utils/i18n";
import { useI18nStore } from "@/store/i18n";

interface Props {
	customClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
	customClass: "",
});

const i18nStore = useI18nStore();

const locales: TI18nKey[] = ["zh-CN", "zh-TW", "en-US"];
const languageLabels: { [key in TI18nKey]: string } = {
	"zh-CN": "简体中文",
	"zh-TW": "繁体中文",
	"en-US": "English",
};

// 点击菜单
const onMenuClick = async (command: TI18nKey) => {
	// 设置当前语言key
	i18nStore.locale = command;
	// 设置 html lang
	setLocale(i18nStore.locale);
	// 设置 element plus 语言
	i18nStore.setElementPlusLocale();
};
</script>

<template>
	<el-dropdown @command="onMenuClick" popper-class="select-lang">
		<span class="text" :class="props.customClass">
			<IconSvg name="language-outline" />
		</span>

		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item
					v-for="item in locales"
					:key="item"
					:command="item"
					:class="{ active: i18nStore.locale === item }"
				>
					{{ languageLabels[item] }}
				</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>
<style lang="scss">
.select-lang {
	.active {
		color: #409eff;
	}
}
</style>
