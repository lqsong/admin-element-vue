<script setup lang="ts">
import { onMounted } from "vue";
import { useTheme } from "@/composables/useTheme";
import { useMenuLayout } from "@/composables/useMenuLayout";
import { useMenuStyle } from "@/composables/useMenuStyle";
import { setHtmlLang } from "@/utils/i18n";
import { useI18nStore } from "@/store/i18n";

const i18nStore = useI18nStore();
onMounted(() => {
	// 设置 html lang
	setHtmlLang(i18nStore.locale);
});

// 设置主题
useTheme();
// 设置菜单导航布局
useMenuLayout();
// 菜单导航风格
useMenuStyle();
</script>

<template>
	<el-config-provider :locale="i18nStore.elementPlusLocale">
		<router-view></router-view>
	</el-config-provider>
</template>

<style scoped></style>
