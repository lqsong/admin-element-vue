<template>
      <div v-if="!routes.hidden" v-show="menuIsShow(routes)">
        <template v-if="!hasChild(routes.children)">
            <app-link :to="getResolvePathUrlRoutes">
                <el-menu-item :index="getResolvePathUrlRoutes">
                    <menu-title :icon="routes.meta.icon||(routes.meta&&routes.meta.icon)" :title="routes.meta.title" />
                </el-menu-item>
            </app-link>
        </template>

        <el-submenu v-else :index="getResolvePathUrlRoutes" popper-append-to-body>
            <template slot="title">
                <menu-title v-if="routes.meta" :icon="routes.meta && routes.meta.icon" :title="routes.meta.title" />
            </template>
            <sidebar-menu-item
                v-for="child in routes.children"
                :key="getResolvePathUrlRoutes + '/' + child.path" 
                :routes="child"
                :base-path="getBasePath"
                :resolve-path="getResolvePathUrlRoutes"
                :active-top-menu="getActiveTopMenu"
                class="nest-menu"
            />
        </el-submenu>
    </div>
</template>
<script>
import path from 'path';
import { mapGetters } from 'vuex';
import { isExternal } from '@/utlis/validate';
import { getBelongTopMenuPath } from '@/utlis/permission';
import MenuTitle from './MenuTitle';
import AppLink from '@/components/Link';
export default {
    name: 'SidebarMenuItem',
    props: {
        // route object
        routes: {
            type: Object,
            required: true
        },
        // 根路径地址
        basePath: {
            type: String,
            required: true
        },
        // 上级路径地址
        resolvePath: {
            type: String,
            default: ''
        },
        activeTopMenu: {
            type: String,
            default: ''
        }
    },
    components: {
        MenuTitle,
        AppLink
    },
    computed: {
        ...mapGetters([
            'siteTopNavEnable'
        ]),
        getBasePath: function() {
            return this.basePath;
        },
        getActiveTopMenu: function () {
            if (this.activeTopMenu !== '') {
                return this.activeTopMenu;
            }
            const route = this.$route;
            /* 
            const { meta, path } = route;
            if (meta.belongTopMenu) {
                return meta.belongTopMenu;
            }
            return '/' + path.split('/')[1];
            */
            return getBelongTopMenuPath(route);
        },
        getResolvePathUrlRoutes: function() {
            return this.resolvePathUrl(this.routes.path);
        }
    },
    methods: {
        menuIsShow(route) {
            if (!this.siteTopNavEnable) {
                return true;
            }
            let activeTopMenu = this.getBasePath;
            const { meta } = route;            
            if (meta.belongTopMenu) {
                activeTopMenu = meta.belongTopMenu;
            }
            return activeTopMenu === this.getActiveTopMenu;
        },
        hasChild(children = []) {
            const showChildren = children.filter(item => {
                if (item.hidden) {
                    return false;
                } else {
                    return true;
                }
            });
            if (showChildren.length > 0) {
                return true;
            }
            return false;
        },
        resolvePathUrl(routePath) {
            if (isExternal(routePath)) {
                return routePath;
            }
            return path.resolve(this.resolvePath, routePath);
        }
    }
};
</script>