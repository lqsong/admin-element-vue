import { Mutation, Action } from 'vuex';
import { StoreModuleType } from "@/utils/store";
import { createData } from './service';
import { FormDataType } from "./data.d";

/* eslint-disable @typescript-eslint/no-empty-interface */
export interface StateType {}

export interface ModuleType extends StoreModuleType<StateType> {
    state: StateType;
    mutations: {
    };
    actions: {
        create: Action<StateType, StateType>;
    };
}

const initState: StateType = {};

const StoreModel: ModuleType = {
    namespaced: true,
    name: 'FormBasic',
    state: {
        ...initState
    },
    mutations: {        
    },
    actions: {
        async create({ commit }, payload: FormDataType) {
            try {
                await createData(payload);
                return true;
            } catch (error) {
                return false;
            }
        }
    }
}

export default StoreModel;