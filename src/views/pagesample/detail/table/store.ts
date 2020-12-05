import { Mutation, Action } from 'vuex';
import { StoreModuleType } from "@/utils/store";
import { queryDetail } from './service';
import { DetailDataType } from './data.d';
import { ResponseData } from '@/utils/request';

export interface StateType {
    detail: DetailDataType;
}

export interface ModuleType extends StoreModuleType<StateType> {
    state: StateType;
    mutations: {
        setDetail: Mutation<StateType>;
    };
    actions: {
        queryDetail: Action<StateType, StateType>;
    };
}

const initState: StateType = {
  detail: {
    userInfo: {
      name: '',
      tel: '',
      courier: '',
      address: '',
      remark: '',
    },
    refundApplication: {
      ladingNo: '',
      saleNo: '',
      state: '',
      childOrders: '',
    },
    returnGoods: [],
    returnProgress: [],
  },
};

const StoreModel: ModuleType = {
    namespaced: true,
    name: 'DetailTable',
    state: {
        ...initState
    },
    mutations: {
        setDetail(state, payload) {
            state.detail = payload;
        },
    },
    actions: {
        async queryDetail({ commit }) {
            try {
                const response: ResponseData = await queryDetail();
                const { data } = response;
                commit('setDetail',{
                    ...initState.detail,
                    ...data
                });
                return true;
            } catch (error) {
                return false;
            }
        }
    }
};

export default StoreModel;
