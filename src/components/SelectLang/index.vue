<template>
    <el-dropdown @command="changeLang">
        <span class="dropDown">
            <icon-svg type="language-outline" ></icon-svg>
        </span>
        <template #dropdown>
            <el-dropdown-menu class="menu">
                <el-dropdown-item v-for="item in locales" :key="item" :command="item" :class="{'active': locale === item}">
                    <span role="img" :aria-label="languageLabels[item]">
                        {{languageIcons[item]}}
                    </span>  
                    {{languageLabels[item]}}
                </el-dropdown-item>                
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>
<script lang="ts">
import { defineComponent, WritableComputedRef } from "vue";
import { setI18nLanguage } from "@/config/i18n";
import { useI18n } from "vue-i18n";
import IconSvg from "@/components/IconSvg";
interface SelectLangSetupData {
    locales: string[];
    languageLabels: {[key: string]: string};
    languageIcons: {[key: string]: string};
    changeLang: ({ key }: any) => void;
    locale: WritableComputedRef<string>;
}

export default defineComponent({
    name: 'SelectLang',
    components: {
        IconSvg
    },
    setup(): SelectLangSetupData {

        const { locale }  = useI18n();
       
        const locales: string[] = ['zh-CN', 'zh-TW', 'en-US'];
        const languageLabels: {[key: string]: string} = {
            'zh-CN': '简体中文',
            'zh-TW': '繁体中文',
            'en-US': 'English',
        };
        const languageIcons: {[key: string]: string} = {
            'zh-CN': '🇨🇳',
            'zh-TW': '🇭🇰',
            'en-US': '🇺🇸',
        };

        // 切换语言
        const changeLang = (command: string): void => {
            setI18nLanguage(command);
        };

        return {
            locales,
            languageLabels,
            languageIcons,
            changeLang,
            locale
        }
    }
})
</script>
<style lang="scss" scoped>
@import '../../assets/css/global.scss';
.dropDown {
  cursor: pointer;
}
.menu {
    .el-dropdown-menu__item {
        min-width: 100px;
    }
}
.active {
    background-color: var(--el-dropdown-menuItem-hover-fill);
    color: var(--el-dropdown-menuItem-hover-color);

}
</style>