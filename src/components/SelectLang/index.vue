<template>
    <el-dropdown @command="changeLang">
        <span class="dropDown">
            <i class="el-icon-football"></i>
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
import { defineComponent } from "vue";
import { setI18nLanguage } from "@/config/i18n";
import { useI18n } from "vue-i18n";
interface SelectLangSetupData {
    locales: string[];
    languageLabels: {[key: string]: string};
    languageIcons: {[key: string]: string};
    changeLang: ({ key }: any) => void;
    locale: string;
}

export default defineComponent({
    name: 'SelectLang',
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
            setI18nLanguage(command, true);
        };

        return {
            locales,
            languageLabels,
            languageIcons,
            changeLang,
            locale: locale as unknown as string
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
    background-color: $--dropdown-menuItem-hover-fill;
    color: $--dropdown-menuItem-hover-color;

}
</style>