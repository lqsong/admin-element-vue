<template>
    <div id="indexlayout-right-top" :class="{'topNavEnable': !topNavEnable, 'tabNavEnable': !tabNavEnable }">
        <div class="indexlayout-right-top-top">
            <div class="indexlayout-flexible" 
              @click="() => {
                if(toggleCollapsed) {
                  toggleCollapsed();
                }
              }"
            >
              <icon-svg type="menu-unfold" v-if="collapsed"></icon-svg>
              <icon-svg type="menu-fold" v-else></icon-svg>
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
              <icon-svg type="home"></icon-svg>
            </div>
            <bread-crumbs class="breadcrumb" :list="breadCrumbs"></bread-crumbs>
        </div>
        <right-tab-nav v-if="tabNavEnable" :routeItem="routeItem"></right-tab-nav>
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, PropType, Ref, toRefs } from "vue";
import { useI18n } from "vue-i18n";
import { BreadcrumbType, RoutesDataItem } from '@/utils/routes';
import IconSvg from "@/components/IconSvg";
import BreadCrumbs from '@/components/BreadCrumbs/index.vue';
import SelectLang from '@/components/SelectLang/index.vue';
import ALink from '@/components/ALink/index.vue';
import RightTopMessage from './RightTopMessage.vue';
import RightTopUser from './RightTopUser.vue';
import RightTabNav from './RightTabNav.vue';
import useTopMenuWidth from "../composables/useTopMenuWidth";

interface RightTopSetupData {
  t: (key: string | number) => string;
  topMenuCon: Ref;
  topMenuWidth: Ref;
}

export default defineComponent({
    name: 'RightTop',
    components: {
      IconSvg,
      ALink,
      BreadCrumbs,
      RightTopMessage,
      RightTopUser,
      SelectLang,
      RightTabNav,
    },
    props: {
      collapsed: {
        type: Boolean,
        default: false
      },
      tabNavEnable: {
        type: Boolean,
        default: true
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
        default: () => {
          return [];
        }
      },
      menuData: {
        type: Array as PropType<RoutesDataItem[]>,
        default: () => {
          return [];
        }
      },
      routeItem: {
        type: Object as PropType<RoutesDataItem>,
        required: true
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