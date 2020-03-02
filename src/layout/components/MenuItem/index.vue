<template>
      <div v-if="!routes.hidden">
        <template v-if="hasChild(routes.children)">
            <app-link :to="resolvePathUrl(routes.path)">
                <el-menu-item :index="resolvePathUrl(routes.path)">
                    <menu-title :icon="routes.meta.icon||(routes.meta&&routes.meta.icon)" :title="routes.meta.title" />
                </el-menu-item>
            </app-link>
        </template>

        <el-submenu v-else :index="resolvePathUrl(routes.path)" popper-append-to-body>
            <template slot="title">
                <menu-title v-if="routes.meta" :icon="routes.meta && routes.meta.icon" :title="routes.meta.title" />
            </template>
            <menu-item
                v-for="child in routes.children"
                :key="resolvePathUrl(routes.path) + '/' + child.path" 
                :routes="child"
                :base-path="getBasePath"
                class="nest-menu"
            />
        </el-submenu>
    </div>
</template>
<script>
import path from 'path';
import { isExternal } from '@/utils/validate';
import MenuTitle from './MenuTitle';
import AppLink from '@/components/Link';
export default {
    name: 'SidebarItem',
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
    methods: {
        getBasePath: function() {
            return this.basePath;
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