<template>
    <slot v-if="isPermission"></slot>
    <slot v-else name="otherwise">
        <result status="403" title="403" subtitle="Sorry, you are not authorized to access this page.">
            <template #extra>
                <router-link to="/">
                    <el-button type="primary">
                        Back Home
                    </el-button>
                </router-link>
            </template>
        </result>
    </slot>
    
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { useStore } from "vuex";
import Result from '@/components/Result/index.vue';
import { StateType as UserStateType } from "@/store/user";
import { hasPermissionRouteRoles } from "@/utils/routes";


interface PermissionSetupData {
    isPermission: boolean;
}

export default defineComponent({
    name: 'Permission',
    props: {
        roles: {
            type: [String , Array] as PropType<string[] | string>,
        }
    },
    components: {
        Result
    },
    setup(props): PermissionSetupData {
        const store = useStore<{user: UserStateType}>(); 

        // 是否有权限
        const isPermission = computed(()=> hasPermissionRouteRoles(store.state.user.currentUser.roles, props.roles));

        return {
            isPermission: isPermission as unknown as boolean
        }

    }
})
</script>