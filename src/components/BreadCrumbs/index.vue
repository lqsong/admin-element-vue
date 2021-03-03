<template>
    <el-breadcrumb>
        <el-breadcrumb-item v-for="item in list" :key="item.path">
            <a-link :to="item.path">{{t(item.title)}}</a-link>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useI18n } from "vue-i18n";
import { BreadcrumbType } from '@/utils/routes';
import ALink from '@/components/ALink/index.vue';

interface BreadCrumbsSetupData {
    t: Function;
}

export default defineComponent({
    name: 'BreadCrumbs',
    props: {
        list: {
            type: Array as PropType<BreadcrumbType[]>,
            default: []
        }
    },
    components: {
        ALink
    },
    setup(): BreadCrumbsSetupData {
        const { t } = useI18n();

        return {
            t
         }
    }
})
</script>