<template>
    <spin style="height: 150px" />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Spin from '@/components/Spin/index.vue';
export default defineComponent({
    name: 'PageLoading',
    components: {
        Spin
    }
})
</script>