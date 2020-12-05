<template>
    <div class="indexlayout-main-conent">
        <el-card shadow="never" class="cus-card">
            <template #header>
                Editor:
            </template>
           <TuiEditor v-model="val" />
        </el-card>
        <el-card shadow="never" class="cus-card" style="margin-top:10px">
            <template #header>
                Content:
            </template>
           <TuiEditorViewer :value="val" />
        </el-card>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import TuiEditor from "@/components/TuiEditor/index.vue";
import TuiEditorViewer from '@/components/TuiEditor/viewer.vue';
export default defineComponent({
    name: 'ComponentEditorCKE',
    components: {
        TuiEditor,
        TuiEditorViewer
    },
    setup() {
        const val = ref<string>('### This is Editor');
        return {
            val
        }
    }
})
</script>
