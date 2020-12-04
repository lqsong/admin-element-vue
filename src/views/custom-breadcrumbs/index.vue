<template>
    <div class="indexlayout-main-conent">
        <el-card shadow="never" class="cus-card">
            <i class="el-icon-top" :style="{fontSize: '35px', color: '#FF0000'}"></i>
            {{t('page.custom-breadcrumbs.msg')}}
       </el-card>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
export default defineComponent({
    setup() {
        const { t } = useI18n();

        return {
            t
        }
    }
})
</script>