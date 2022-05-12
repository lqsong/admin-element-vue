<template>
    <el-popover
      trigger="hover"
      :width="200"
    >
      <template #reference>
        <span class="universallayout-top-settings"><icon-svg type="theme"></icon-svg></span>
      </template>

      <div class="setting">
        <div class="setting-title">页面风格</div>
        <div class="setting-radio">
          <div class="setting-radio-item style-dark" title="dark" @click="setTheme('dark')">
            <icon-svg v-if="theme==='dark'" class="choose-icon" type="tick"></icon-svg>
          </div>
          <div class="setting-radio-item style-light" title="light" @click="setTheme('light')">
            <icon-svg v-if="theme==='light'" class="choose-icon" type="tick"></icon-svg>
          </div>
        </div>

        <el-divider style="margin: 10px 0;"></el-divider>

        <div class="setting-title">导航模式</div>
        <div class="setting-radio">
          <div class="setting-radio-item nav-vertical" title="vertical" @click="setNavMode('vertical')">
            <icon-svg v-if="navMode==='vertical'" class="choose-icon" type="tick"></icon-svg>
          </div>
          <div class="setting-radio-item nav-horizontal" title="horizontal" @click="setNavMode('horizontal')">
            <icon-svg v-if="navMode==='horizontal'" class="choose-icon" type="tick"></icon-svg>
          </div>
        </div>

        <el-divider style="margin: 10px 0;"></el-divider>

        <div class="setting-list">
          <div class="setting-list-item">
            <span>固定头部</span>
            <span class="setting-list-item-action">
              <el-switch v-model="headFixed" size="small" />
            </span>
          </div>
          <div class="setting-list-item">
            <span>TabNav</span>
            <span class="setting-list-item-action">
              <el-switch v-model="tabNavEnable" size="small" />
            </span>
          </div>
          <div class="setting-list-item">
            <span>固定侧边</span>
            <span class="setting-list-item-action">
              <el-switch v-model="leftSiderFixed" size="small" />
            </span>
          </div>
        </div>
      </div>
    </el-popover>
</template>
<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import { useStore } from "vuex"
import localforage from 'localforage'
import { StateType as GlobalStateType } from '@/store/global'
import IconSvg from "@/components/IconSvg"

const THEME_LOCAL_KEY = 'theme'
const NAVMODE_LOCAL_KEY = 'navmode'

const getThemeLocal = async (): Promise<string | null> => {
  return await localforage.getItem(THEME_LOCAL_KEY)
};

const setThemeLocal = async (val: string): Promise<boolean> => {
  try {
    await localforage.setItem(THEME_LOCAL_KEY, val);
    return true;
  } catch (error) {
    return false;
  }
};

const getNavModeLocal = async (): Promise<string | null> => {
  return await localforage.getItem(NAVMODE_LOCAL_KEY)
};

const setNavModeLocal = async (val: string): Promise<boolean> => {
  try {
    await localforage.setItem(NAVMODE_LOCAL_KEY, val);
    return true;
  } catch (error) {
    return false;
  }
};


const store = useStore<{global: GlobalStateType;}>();

// 模板主题
const theme = computed(()=> store.state.global.theme);
const setTheme = (value: string): void => {
  store.commit('global/setTheme', value);
  setThemeLocal(value);
}

// 导航模式
const navMode = computed(()=> store.state.global.navMode);
const setNavMode = (value: string): void => {
  store.commit('global/setNavMode', value);
  setNavModeLocal(value);
}

// 头部是否固定
const headFixed = computed({
  get: ()=> store.state.global.headFixed,
  set: value => {
    store.commit('global/setHeadFixed', value);
  }
})

// 头部tabnav是否开启
const tabNavEnable = computed({
  get: ()=> store.state.global.tabNavEnable,
  set: value => {
    store.commit('global/setTabNavEnable', value);
  }
})

// 左侧侧边固定开启
const leftSiderFixed = computed({
  get: ()=> store.state.global.leftSiderFixed,
  set: value => {
    store.commit('global/setLeftSiderFixed', value);
  }
})


const getLocalData = async () => {
  const local_theme = await getThemeLocal()
  const local_nav_mode = await getNavModeLocal()
  if(local_theme) {
    store.commit('global/setTheme', local_theme);
  }
  if(local_nav_mode) {
    store.commit('global/setNavMode', local_nav_mode);
  }
}
onMounted(()=> {
  getLocalData()
})


</script>
<style lang="scss" scoped>
.setting {
  padding: 0 10px;

  .setting-title {
      color: rgba(0,0,0,.85);
      font-size: 14px;
      padding-bottom: 10px;
      font-weight: 600;
  }

  .setting-radio {
      display: flex;
      padding-bottom: 10px;
    .setting-radio-item{
      position: relative;
      width: 44px;
      height: 36px;
      margin-right: 16px;
      overflow: hidden;
      background-color: #f0f2f5;
      border-radius: 4px;
      box-shadow: 0 1px 2.5px 0 rgba(0,0,0,.18);
      cursor: pointer;

      &:before {
          position: absolute;
          top: 0;
          left: 0;
          width: 33%;
          height: 100%;
          background-color: #fff;
          content: "";
      }
      &:after {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 25%;
          background-color: #fff;
          content: "";
      }

      &.style-light {
        &:before {
          background-color: #fff;
        }
        &:after {
            background-color: #fff;
        }
      }
      &.style-dark{
        &:before {
          z-index: 1;
          background-color: #001529;
        }
        &:after {
          background-color: #fff;
        }
      }

      &.nav-vertical{
        &:before {
          z-index: 1;
          background-color: #001529;
        }
        &:after {
          background-color: #fff;
        }
      }

      &.nav-horizontal {

        &:before {
          background-color: #f0f2f5;
        }
        &:after {
          background-color: #001529;
        }

      }

      .choose-icon {
        position: absolute;
        right: 6px;
        bottom: 4px;
        color: #1890ff;
        font-weight: 700;
        font-size: 14px;
        pointer-events: none;
      }



    }
  }

  .setting-list {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-size: 14px;
    font-variant: tabular-nums;
    position: relative;
    .setting-list-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 0;
      color: rgba(0,0,0,.85);
      .setting-list-item-action {
        flex: 0 0 auto;
        margin-left: 40px;
        padding: 0;
      }
    }
  }

  .padding-t10 {
    padding-top: 10px;
  }
}
</style>
