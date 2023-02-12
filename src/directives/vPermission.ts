/**
 * 自定义指令 权限验证
 * @author LiQingSong
 * 使用Demo：
 * <script lang="ts" setup>
 *    import vPermission from '@/directives/vPermission';
 * </script>
 * <template>
 *    <a href="#" v-permission="'test'">删除</a>
 *    <a href="#" v-permission="['admin','test']">删除</a>
 * </template>
 */
import type { ObjectDirective, DirectiveBinding } from "vue";
import { useUserStore } from "@/store/user";
import { hasPermissionRoles } from "@/utils/router";

const vPermission: ObjectDirective = {
	// 在绑定元素的父组件
	// 及他自己的所有子节点都挂载完成后调用
	mounted(el: HTMLElement, binding: DirectiveBinding) {
		const { value } = binding;
		if (value) {
			const userStroe = useUserStore();
			if (!hasPermissionRoles(userStroe.roles, value)) {
				el.parentNode && el.parentNode.removeChild(el);
			}
		} else {
			throw new Error("need roles! Like v-permission=\"['admin','test']\" or v-permission=\"'test'\"");
		}
	},
};

export default vPermission;
