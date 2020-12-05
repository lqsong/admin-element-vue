import { Mutation, Action } from 'vuex';
import { StoreModuleType } from "@/utils/store";
import { RegisterParamsType } from "./data.d";
import { accountReg } from "./service";

export interface StateType {
    errorMsg?: string;
}

export interface ModuleType extends StoreModuleType<StateType> {
    state: StateType;
    mutations: {
        changeErrorMsg: Mutation<StateType>;
    };
    actions: {
        register: Action<StateType, StateType>;
    };
}

const initState: StateType = {
  errorMsg: undefined,
};

const StoreModel: ModuleType = {
    namespaced: true,
    name: 'userregister',
    state: {
        ...initState
    },
    mutations: {
        changeErrorMsg(state, payload) {
            state.errorMsg = payload;
        },
    },
    actions: {
        async register({ commit }, payload: RegisterParamsType) {
            let msg = undefined;
            try {
                await accountReg(payload);
                msg = '';
            } catch (error) {
                if (error.message && error.message === 'CustomError') {
                    const { response } = error;
                    const { data } = response;
                    msg = data.msg || 'error';
                }
            }

            commit('changeErrorMsg',msg);

            if (msg === '') {
                return true; // 成功
            } else if (typeof msg === 'undefined') {
                return undefined; // 服务器错误
            } else {
                return false; // 自定义错误
            }
        }
    }
};

export default StoreModel;
