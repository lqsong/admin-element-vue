<template>
    <div class="indexlayout-main-conent">
        <el-card shadow="never" class="cus-card">
            <template #header>
                Editor:
            </template>
           <CKEditor v-model="val" />
        </el-card>
        <el-card shadow="never" class="cus-card" style="margin-top:10px">
            <template #header>
                Content:
            </template>
           <div v-html="val"></div>
        </el-card>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import CKEditor from "@/components/CKEditor/index.vue";
export default defineComponent({
    name: 'ComponentEditorCKE',
    components: {
        CKEditor
    },
    setup() {
        const val = ref<string>('<h1>This is Editor</h1>');
        return {
            val
        }
    }
})
</script>
