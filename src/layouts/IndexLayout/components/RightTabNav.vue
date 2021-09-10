<template>
    <div class="indexlayout-top-tab-nav">
        <div class="left" @click="handleScroll(200)">
             <icon-svg type="arrow-left"  />
        </div>
        <div class="middle" ref="scrollBox" @DOMMouseScroll="handleRolling" @mousewheel="handleRolling">
            <div class="tab" ref="scrollContent" :style="{transform: `translateX(${translateX}px)`}">
                <el-tag v-for="item in tabNavList" :key="item.key" :closable="item.key!==homeRouteItemPath" :class="{'active': route.path===item.key}"  type='info'  size="medium" color="#FFFFFF">{{t(item.menu.title)}}</el-tag>
            </div>
        </div>
        <div class="right"  @click="handleScroll(-200)">
            <icon-svg type="arrow-right"  />
        </div>
        <div class="down">
            <icon-svg type="arrow-down"  />
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
                        route: route,
                        menu: routeItem.value
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

        


        return {  
            t,    
            translateX,
            scrollBox,
            scrollContent,
            handleScroll,
            handleRolling,
            tabNavList,
            homeRouteItemPath: settings.homeRouteItem.path,
            route
        }
    }
})

</script>
<style lang="scss" scoped>
@import '../../../assets/css/global.scss';
.indexlayout-top-tab-nav {
    height: $headerTabNavHeight;
    /* background-color: #f0f0f0; */
    box-shadow: 0 -1px 4px rgba(0, 21, 41, 0.08);
    display: flex;
    align-items:center;
    .left,
    .right,
    .down {
        width: ($headerTabNavHeight - 10px);
       /*  background-color: #FFFFFF; */
        text-align: center;
        font-size: 12px;
        cursor: pointer;
    }
    .down {
        background-color: #FFFFFF;
        width: ($headerTabNavHeight);
        height: ($headerTabNavHeight - 8px);
        line-height: ($headerTabNavHeight - 8px);
        
    }
    .middle {
        flex: 1;
        overflow: hidden;
        .tab {
            position: relative;           
            float: left;
            /* padding: 0 10px; */
            list-style: none;
            overflow: visible;
            white-space: nowrap;
            transition: transform .5s ease-in-out;
            .el-tag{
                border: 0;
                cursor: pointer;
                &+.el-tag {
                    margin-left: 10px;
                }
            }
            .active {
                color: $--color-primary;
            }
        }
    }

}
</style>