<template>
    <div id="indexlayout-right-top" :class="{'topNavEnable': !topNavEnable }">
        <div class="indexlayout-right-top-top">
            <div class="indexlayout-flexible" 
              @click="() => {
                if(toggleCollapsed) {
                  toggleCollapsed();
                }
              }"
            >
               <i class="el-icon-s-unfold" v-if="collapsed"></i>
               <i class="el-icon-s-fold" v-else></i>
            </div>
            <div class="indexlayout-top-menu">
                <div ref="topMenuCon" :style="{width: topMenuWidth}">
                    <template v-if="topNavEnable">
                      <template v-for="(item, key) in menuData">
                        <a-link
                          :key="key"
                          v-if="!item.hidden"
                          :to="item.path"
                          :class="{'active': belongTopMenu === item.path }"
                          class="indexlayout-top-menu-li"
                        >
                        {{t(item.title)}}
                        </a-link>
                      </template>
                    </template>             
                    <bread-crumbs v-else class="breadcrumb" :list="breadCrumbs"></bread-crumbs>
                </div>
            </div>
            <div class="indexlayout-top-menu-right">

                <right-top-message />

                <right-top-user />

                <select-lang class="indexlayout-top-selectlang" />

            </div>
        </div>
        <div v-if="topNavEnable" class="indexlayout-right-top-bot">
            <div class="indexlayout-right-top-bot-home">
              <i class="el-icon-s-home"></i>
            </div>
            <bread-crumbs class="breadcrumb" :list="breadCrumbs"></bread-crumbs>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, PropType, Ref, toRefs } from "vue";
import { useI18n } from "vue-i18n";
import { BreadcrumbType, RoutesDataItem } from '@/utils/routes';
import BreadCrumbs from '@/components/BreadCrumbs/index.vue';
import SelectLang from '@/components/SelectLang/index.vue';
import ALink from '@/components/ALink/index.vue';
import RightTopMessage from './RightTopMessage.vue';
import RightTopUser from './RightTopUser.vue';
import useTopMenuWidth from "../composables/useTopMenuWidth";

interface RightTopSetupData {
  t: Function;
  topMenuCon: Ref;
  topMenuWidth: Ref;
}

export default defineComponent({
    name: 'RightTop',
    components: {
      ALink,
      BreadCrumbs,
      RightTopMessage,
      RightTopUser,
      SelectLang,
    },
    props: {
      collapsed: {
        type: Boolean,
        default: false
      },
      topNavEnable: {
        type: Boolean,
        default: true
      },
      belongTopMenu: {
        type: String,
        default: ''
      },
      toggleCollapsed: {
        type: Function as PropType<() => void>
      },
      breadCrumbs: {
        type: Array as PropType<BreadcrumbType[]>,
        default: []
      },
      menuData: {
        type: Array as PropType<RoutesDataItem[]>,
        default: []
      }
    },
    setup(props): RightTopSetupData {
      const { t } = useI18n();
      const { topNavEnable } = toRefs(props);

      const { topMenuCon, topMenuWidth } = useTopMenuWidth(topNavEnable);

      return {
        t,
        topMenuCon,
        topMenuWidth
      }
    }
})
</script>
<style lang="scss">
@import '../../../assets/css/global.scss';
#indexlayout-right-top {
  width: 100%;
  height: ($headerHeight + $headerBreadcrumbHeight);
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  z-index: 9;
  .indexlayout-right-top-top {
    display: flex;
    width: 100%;
    height: $headerHeight;
    background-color: $menu-dark-bg;
    color: #c0c4cc;
    .indexlayout-flexible {
      width: $headerHeight;
      height: $headerHeight;
      line-height: $headerHeight;
      text-align: center;
      cursor: pointer;
      &:hover {
        background-color: $menu-dark-submenu-bg;
        color: $menu-dark-highlight-color;
      }
    }

    .indexlayout-top-menu {
      height: $headerHeight;
      line-height: $headerHeight;
      flex: 1;
      /* display: flex; */
      overflow: hidden;
      overflow-x: auto;
      .indexlayout-top-menu-li {
        display: inline-block;
        padding: 0 15px;
        height: ($headerHeight - 3);
        text-decoration: none;
        color: #c0c4cc;
        font-size: 15px;
        border-bottom: solid 3px transparent;
        &:hover,
        &.active {
          background-color: $menu-dark-submenu-bg;
          color: $menu-dark-highlight-color;
          border-bottom-color: $--color-primary;
        }
      }

      .breadcrumb {
        line-height: $headerHeight;
      }
    }

    .indexlayout-top-menu-right {
      width: 150px;
      .indexlayout-top-usermenu {
        padding-left: 10px;
        color: #c0c4cc;
      }
      .indexlayout-top-selectlang {
        padding-left: 10px;
        .dropDown {
          i {
            font-size: 16px;
            color: #c0c4cc;
          }
        }
      }
    }

    @include scrollbar;

  }
  .indexlayout-right-top-bot {
    display: flex;
    width: 100%;
    height: $headerBreadcrumbHeight;
    background-color: $mainBgColor;
    .indexlayout-right-top-bot-home {
      width: $headerBreadcrumbHeight;
      height: $headerBreadcrumbHeight;
      line-height: $headerBreadcrumbHeight;
      text-align: center;
    }
    .breadcrumb {
      line-height: $headerBreadcrumbHeight;
      margin-left: 10px;
    }
  }
  &.topNavEnable {
    height: $headerHeight;
    .indexlayout-right-top-top {
      background-color: #ffffff;
      color: $--color-text-primary;
      .indexlayout-flexible {
        &:hover {
          background-color: $mainBgColor;
          color: $heading-color;
        }
      }
      .indexlayout-top-menu-right {
        .indexlayout-top-message {
          color: $heading-color;
        }
        .indexlayout-top-usermenu {
          color: $heading-color;
        }
        .indexlayout-top-selectlang {
          .dropDown {
            i {
              color: $heading-color;
            }
          }
        }
      }
    }
  }
}
</style>