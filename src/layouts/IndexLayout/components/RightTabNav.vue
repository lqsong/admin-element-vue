<template>
    <div class="indexlayout-top-tab-nav">
        <div class="left" @click="handleScroll(200)">
             <icon-svg class="icon" type="arrow-left"  />
        </div>
        <div class="middle" ref="scrollBox" @DOMMouseScroll="handleRolling" @mousewheel="handleRolling">
            <div class="tab" ref="scrollContent" :style="{transform: `translateX(${translateX}px)`}">
                <span v-for="item in tabNavList" :key="item.key" class="item" :class="{'active': route.path===item.key}" @click="toRoute(item)">
                    <icon-svg v-if="route.path===item.key" class="icon-pre" type="refresh" @click.stop="refreshCurrentTabNav(item)"  />
                    <span>{{t(item.menu.title)}}</span> 
                    <icon-svg v-if="item.key!==homeRouteItemPath" class="icon" type="close" @click.stop="closeCurrentTabNav(item)" />
                </span>
            </div>
        </div>
        <div class="right"  @click="handleScroll(-200)">
            <icon-svg class="icon" type="arrow-right"  />
        </div>
        <div class="down">
            <icon-svg class="icon" type="more"  />
        </div>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent, ComputedRef, ref, Ref, watch, PropType, toRefs, onMounted } from "vue";
import { useRoute, useRouter, RouteLocationNormalizedLoaded } from 'vue-router';
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import IconSvg from "@/components/IconSvg";
import { StateType as GlobalStateType } from "@/store/global";
import { getTabNavKeyValue, RoutesDataItem, TabNavItem, TabNavKey } from '@/utils/routes';
import settings from '@/config/settings';

interface RightTabNavSetupData {  
    t: (key: string | number) => string;  
    translateX: Ref<number>;
    scrollBox: Ref;
    scrollContent: Ref;
    handleScroll: (offset: number) => void;
    handleRolling: (e: any)=> void;
    tabNavList: ComputedRef<TabNavItem[]>;
    homeRouteItemPath: string;
    route: RouteLocationNormalizedLoaded;
    toRoute: (item: TabNavItem) => void;
    refreshCurrentTabNav: (item: TabNavItem) => void;
    closeCurrentTabNav: (item: TabNavItem) => void;
}

export default defineComponent({
    name: 'RightTabNav',
    components: {
        IconSvg
    },
    props: {
        routeItem: {
            type: Object as PropType<RoutesDataItem>,
            required: true
        }
    },
    setup(props): RightTabNavSetupData {

        const { t } = useI18n();
        const { routeItem } = toRefs(props);

        
        const translateX = ref<number>(0);
        const scrollBox = ref<HTMLDivElement>();
        const scrollContent = ref<HTMLDivElement>();
        const handleScroll = (offset: number): void => {
            const boxWidth = scrollBox.value ? scrollBox.value.offsetWidth : 0;
            const contentWidth = scrollContent.value ? scrollContent.value.offsetWidth : 0;
            if(offset > 0) {
                translateX.value = Math.min(0, translateX.value + offset)
            } else {
                if (boxWidth < contentWidth) {
                    if (translateX.value >= -(contentWidth - boxWidth)) {
                        translateX.value = Math.max(translateX.value + offset, boxWidth - contentWidth)
                    } 
                } else {
                    translateX.value = 0;
                }
            }

        }

        // 鼠标滚动
        const handleRolling = (e: any) => {
            const type = e.type
            let delta = 0
            if (type === 'DOMMouseScroll' || type === 'mousewheel') {
                delta = (e.wheelDelta) ? e.wheelDelta : -(e.detail || 0) * 40
            }
            handleScroll(delta)
        }


        const store = useStore<{global: GlobalStateType}>();
        const tabNavList = computed<TabNavItem[]>(()=> store.state.global.headTabNavList);
        const router = useRouter();
        const route = useRoute();

     

       
        const setTabNav = (): void => {

            const currentTabNavKey: TabNavKey =  routeItem.value.tabNavKey || 'path';
            const currentTabNavKeyVal: string = getTabNavKeyValue(route, currentTabNavKey);
            // 数组里是否已经存在当前key
            const isCurrent = tabNavList.value.some(item =>{
                if(item.key === currentTabNavKeyVal){
                    return true 
                } 
            });
            if(!isCurrent) {
                store.commit('global/setHeadTabNavList', [
                    ...tabNavList.value,
                    {
                        key: currentTabNavKeyVal,
                        route: {
                            ...route
                        },
                        menu: {
                            ...routeItem.value
                        }
                    }
                ]);
            }




            

            // console.log('route', route, router.currentRoute.value, router.resolve('/home/workplace'), router.currentRoute.value==router.resolve('/home/workplace'))
        }
        watch([route, routeItem], ()=> {
            if(route.path===routeItem.value.path) setTabNav()
        })

        onMounted(()=> {
            setTabNav()
        })


        // 路由链接
        const toRoute = (item: TabNavItem): void => {
            router.push(item.route);
        }
        const refreshCurrentTabNav = (item: TabNavItem): void => {
                    console.log('refreshCurrentTabNav', item)
        }
        // 关闭当前tabNav
        const closeCurrentTabNav = (item: TabNavItem): void => {
                    console.log('closeCurrentTabNav', item)
        }


        return {  
            t,    
            translateX,
            scrollBox,
            scrollContent,
            handleScroll,
            handleRolling,
            tabNavList,
            homeRouteItemPath: settings.homeRouteItem.path,
            route,
            toRoute,
            refreshCurrentTabNav,
            closeCurrentTabNav,
        }
    }
})

</script>
<style lang="scss" scoped>
@import '../../../assets/css/global.scss';
.indexlayout-top-tab-nav {
    height: ($headerTabNavHeight - 4px);
    padding-top: 4px;
    /* background-color: #f0f0f0; */
    box-shadow: 0 -1px 4px rgba(0, 21, 41, 0.08);
    display: flex;
    align-items:center;
    .left,
    .right,
    .down {
        width: ($headerTabNavHeight - 10px);
        height: ($headerTabNavHeight - 8px);
        line-height: ($headerTabNavHeight - 8px);
       /*  background-color: #FFFFFF; */
        text-align: center;
        font-size: 12px;
        cursor: pointer;
        .icon {
            color: rgba(0,0,0,.45);
        }
        &:hover {
            .icon {
                color: rgba(0,0,0,.75);
            }
        }
    }
     .down {
        padding-right: 10px;
        /*background-color: #FFFFFF;
        width: ($headerTabNavHeight);
        */
    } 
    .middle {
        flex: 1;
        overflow: hidden;
        .tab {
            position: relative;           
            float: left;
            list-style: none;
            overflow: visible;
            white-space: nowrap;
            transition: transform .5s ease-in-out;
            .item {
                height: ($headerTabNavHeight - 6px);
                line-height: ($headerTabNavHeight - 6px);
                background: #fafafa;
                box-sizing: border-box;
                white-space: nowrap;
                display: inline-block;
                padding: 0 10px;
                border-radius: 4px 4px 0 0;
                transition: all .3s cubic-bezier(.645,.045,.355,1);
                cursor: pointer;
                font-size: 14px;
                color: rgba(0,0,0,.65);
                border: 1px solid  $mainBgColor;
                &+.item {
                    margin-left: 3px;
                }
                &:hover {
                    color: $--color-primary;
                }
                .icon {
                    font-size: 10px;
                    margin: 0 0 2px 5px;
                    color: rgba(0,0,0,.45);
                    &:hover {
                        color: rgba(0,0,0,.75);
                    }

                }
                .icon-pre {
                    font-size: 12px;
                    margin: 0 5px 0 0;
                    color: rgba($--color-primary, 0.75);
                    &:hover {
                        color: rgba($--color-primary, 1);
                    }
                }
            }            
            .active {
                color: $--color-primary;
                background:#FFFFFF;
                border-color:#FFFFFF;
            }
        }
    }

}
</style>