<template>
  <router-view></router-view>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { setHtmlLang } from "@/utils/i18n";
import { useI18n } from "vue-i18n";
export default defineComponent({
  name: 'App',
  setup() {
    const { locale } = useI18n();

    onMounted(() => {
      setHtmlLang(locale.value);
    })
    
  }
})
</script>
