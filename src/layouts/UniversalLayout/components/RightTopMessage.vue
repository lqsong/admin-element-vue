<template>
    <router-link to="/" class="universallayout-top-message">
      <icon-svg type="message"  :style="{ fontSize: '16px' }"></icon-svg>
      <el-badge
        class="universallayout-top-message-badge"
        :value="message"
        type="danger"
      />
    </router-link>
</template>
<script lang="ts" setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { StateType as UserStateType } from "@/store/user";
import IconSvg from "@/components/IconSvg";

const store = useStore<{user: UserStateType}>();

const message = computed<number>(()=> store.state.user.message);

onMounted(()=>{
    store.dispatch("user/fetchMessage");
})
</script>
