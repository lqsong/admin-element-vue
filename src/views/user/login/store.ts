import { Mutation, Action } from 'vuex';
import { StoreModuleType } from "@/utils/store";
import { ResponseData } from '@/utils/request';
import { setToken } from '@/utils/localToken';
import { accountLogin } from './service';
import { LoginParamsType } from "./data.d";

export interface StateType {
    loginStatus?: 'ok' | 'error';
}

export interface ModuleType extends StoreModuleType<StateType> {
    state: StateType;
    mutations: {
        changeLoginStatus: Mutation<StateType>;
    };
    actions: {
        login: Action<StateType, StateType>;
    };
}

const initState: StateType = {
    loginStatus: undefined,
}

const StoreModel: ModuleType = {
    namespaced: true,
    name: 'userlogin',
    state: {
        ...initState
    },
    mutations: {
        changeLoginStatus(state, payload) {
            state.loginStatus = payload;
        },
    },
    actions: {
        async login({ commit }, payload: LoginParamsType) {
            let status = undefined;
            try {
                const response: ResponseData = await accountLogin(payload);
                const { data } = response;
                setToken(data.token || '');
                status = 'ok';
            } catch (error) {
                if (error.message && error.message === 'CustomError') {
                    status = 'error';
                }
            }

            commit('changeLoginStatus',status);

            if (status === 'ok') {
                return true;
            } else if (status === 'error') {
                return false;
            }
            return undefined;
        }
    }
}

export default StoreModel;