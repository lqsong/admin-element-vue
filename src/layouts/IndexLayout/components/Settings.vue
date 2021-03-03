<template>
    <div 
        :style="{
          position: 'fixed',
          display: 'block',
          width: '45px',
          height: '45px',
          lineHeight: '48px',
          right: '0',
          top: '30%',
          backgroundColor: '#222834',
          textAlign: 'center',
          cursor: 'pointer',
          borderRadius: '5px 0 0 5px',
        }"
        @click="show" 
    >
        <i class="el-icon-setting" :style="{ fontSize: '20px', color: '#fcfcfc' }"></i>
    </div>
    <el-drawer
        custom-class="indexlayout-settings"
        title="系统布局配置"
        v-model="visible"
        @close="close"
        size="256px"
    >
        <el-form>
            <el-form-item label="启用顶部导航" class="text-align-right">
                <el-switch v-model="topNavEnable" @change="onChangeTopNavEnable" />
            </el-form-item>
            <el-form-item label="固定右侧头部" class="text-align-right">
                <el-switch v-model="headFixed" @change="onChangeHeadFixed" :disabled="disabledHeadFixed" />
            </el-form-item>
        </el-form>

    </el-drawer>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from 'vuex';
import { StateType as GlobalStateType } from '@/store/global';

interface SettingsSetupData {
    visible: boolean;
    close: () => void;
    show: () => void;
    topNavEnable: boolean;
    onChangeTopNavEnable: (v: boolean) => void;
    headFixed: boolean;
    onChangeHeadFixed: (v: boolean) => void;
    disabledHeadFixed: boolean;
}

export default defineComponent({
    name: 'Settings',
    setup(): SettingsSetupData {
        
        const store = useStore<{global: GlobalStateType}>(); 

        const visible = ref<boolean>(false);
        // 关闭
        const close = (): void => {
            visible.value = false;
        }
        // 显示
        const show = (): void => {
            visible.value = true;
        }

        // 固定右侧头部
        const disabledHeadFixed = ref<boolean>(true);
        const headFixed = computed<boolean>(()=> store.state.global.headFixed);
        const onChangeHeadFixed = (v: boolean): void => {
            store.commit('global/setHeadFixed', v);
        }

        // 启用顶部导航
        const topNavEnable = computed<boolean>(()=> store.state.global.topNavEnable);
        const onChangeTopNavEnable = (v: boolean): void => {
            store.commit('global/setTopNavEnable', v);

            if (v) {
                disabledHeadFixed.value = true;
                onChangeHeadFixed(true);
            } else {
                disabledHeadFixed.value = false;
            }

        }       


        return {
            visible: visible as unknown as boolean,
            close,
            show,
            topNavEnable: topNavEnable as unknown as boolean,
            onChangeTopNavEnable,
            headFixed: headFixed as unknown as boolean,
            onChangeHeadFixed,
            disabledHeadFixed: disabledHeadFixed as unknown as boolean,
        }

    }
})
</script>
<style lang="scss">
.indexlayout-settings{
    .el-drawer__body {
        padding: 24px;
    }
}
</style>