/**
 * @description: 登录用户信息 store
 * @author LiQingSong
 */
import { defineStore } from "pinia";
import { ResultCodeEnum } from "@/enums/utils.request.enum";
import { IResponseData } from "@/@types/utils.request";
import { queryUserInfo } from "@/services/user";

// state ts类型
export interface IUserState {
	// 用户id
	id: number;
	// 用户名
	name: string;
	// 用户权限角色
	roles: string[];
}

export const useUserStore = defineStore("useUserStore", {
	state: (): IUserState => {
		return {
			id: 0,
			name: "",
			roles: [],
		};
	},
	getters: {
		// 是否登录
		isLogin({ id }) {
			return id > 0;
		},
	},
	actions: {
		/**
		 * @description: 获取用户信息
		 * @returns result code 0 已登录并且获取用户信息成功,1 未登录, 2 后端返回的其他错误，999 服务器错误
		 */
		async getInfo() {
			const result = { code: 0, msg: "" };
			if (this.id > 0) {
				// 如果用户已经登录了，就不要请求了
				return result;
			}

			try {
				const response: IResponseData = await queryUserInfo();
				const data = response.data;
				this.id = data.id || 0;
				this.name = data.name || "";
				this.roles = data.roles || [];
			} catch (error: any) {
				console.log("error", error);
				if (error.message && error.message === "CustomError") {
					const response = error.response || { data: { code: ResultCodeEnum.LOGININVALID, msg: "" } };
					const { code, msg } = response.data;
					if (code === ResultCodeEnum.LOGININVALID) {
						result.code = 1;
					} else {
						result.code = 2;
					}
					result.msg = msg;
				} else {
					result.code = 999;
					result.msg = error;
				}
			}
			return result;
		},
		/**
		 * @description: 重置用户信息
		 */
		reset() {
			this.id = 0;
			this.name = "";
			this.roles = [];
		},
	},
});
