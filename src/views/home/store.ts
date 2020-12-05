import { Mutation, Action } from 'vuex';
import { StoreModuleType } from "@/utils/store";
import { ResponseData } from '@/utils/request';
import {
    dailynewArticles,
    weeknewWorks,
    monthnewTopics,
    annualnewLinks,
    hotSearchQueryList,
    hotTagsQueryList,
    articleHitQueryList,
    worksHitQueryList,
  } from './service';
import {
    ArticleChartDataType,
    WorksChartDataType,
    TopicsChartDataType,
    LinksChartDataType,
    HotSearchDataType,
    HotTagsDataType,
    ArticleHitDataType,
    WorksHitDataType,
    TableListQueryParams
  } from './data.d';

export interface StateType {
  articleChartData: ArticleChartDataType;
  worksChartData: WorksChartDataType;
  topicsChartData: TopicsChartDataType;
  linksChartData: LinksChartDataType;
  hotSearchData: HotSearchDataType;
  hotTagsData: HotTagsDataType;
  articleHitData: ArticleHitDataType;
  worksHitData: WorksHitDataType;
}

export interface ModuleType extends StoreModuleType<StateType> {
    state: StateType;
    mutations: {
        setArticleChartData: Mutation<StateType>;
        setWorksChartData: Mutation<StateType>;
        setTopicsChartData: Mutation<StateType>;
        setLinksChartData: Mutation<StateType>;
        setHotSearchData: Mutation<StateType>;
        setHotTagsData: Mutation<StateType>;
        setArticleHitData: Mutation<StateType>;
        setWorksHitData: Mutation<StateType>;
    };
    actions: {
        queryArticleChartData: Action<StateType, StateType>;
        queryWorksChartData: Action<StateType, StateType>;
        queryTopicsChartData: Action<StateType, StateType>;
        queryLinksChartData: Action<StateType, StateType>;
        queryHotSearchData: Action<StateType, StateType>;
        queryHotTagsData: Action<StateType, StateType>;
        queryArticleHitData: Action<StateType, StateType>;
        queryWorksHitData: Action<StateType, StateType>;
    };
}

const initState: StateType = {
    articleChartData: {
      total: 0,
      num: 0,
      week: 0,
      day: 0,
    },
    worksChartData: {
      total: 0,
      num: 0,
      chart: {
        day: [],
        num: [],
      },
    },
    topicsChartData: {
      total: 0,
      num: 0,
      chart: {
        day: [],
        num: [],
      },
    },
    linksChartData: {
      total: 0,
      num: 0,
      chart: {
        day: [],
        num: [],
      },
    },
    hotSearchData: {
        list: [],
        pagination: {
        total: 0,
        current: 1,
        pageSize: 5,
        showSizeChanger: false,
        },
    },
    hotTagsData: {
        list: [],
        pagination: {
        total: 0,
        current: 1,
        pageSize: 5,
        showSizeChanger: false,
        },
    },
    articleHitData: {
        list: [],
        pagination: {
        total: 0,
        current: 1,
        pageSize: 5,
        showSizeChanger: false,
        },
    },
    worksHitData: {
        list: [],
        pagination: {
        total: 0,
        current: 1,
        pageSize: 5,
        showSizeChanger: false,
        },
    },
};

const StoreModel: ModuleType = {
    namespaced: true,
    name: 'Home',
    state: {
        ...initState
    },
    mutations: {
        setArticleChartData(state, payload) {
            state.articleChartData = payload;
        },
        setWorksChartData(state, payload) {
            state.worksChartData = payload;
        },
        setTopicsChartData(state, payload) {
            state.topicsChartData = payload;
        },
        setLinksChartData(state, payload) {
            state.linksChartData = payload;
        },
        setHotSearchData(state, payload) {
            state.hotSearchData = payload;
        },
        setHotTagsData(state, payload) {
            state.hotTagsData = payload;
        },
        setArticleHitData(state, payload) {
            state.articleHitData = payload;
        },
        setWorksHitData(state, payload) {
            state.worksHitData = payload;
        },
    },
    actions: {
        async queryArticleChartData({ commit }) {
            try {
                const response: ResponseData = await dailynewArticles();
                const { data } = response;
                commit('setArticleChartData', {
                    ...initState.articleChartData,
                    ...data,
                });
                return true;
            } catch (error) {
                return false;
            }
        },
        async queryWorksChartData({ commit }) {
            try {
                const response: ResponseData = await weeknewWorks();
                const { data } = response;
                commit('setWorksChartData', {
                    ...initState.worksChartData,
                    ...data,
                });
                return true;
            } catch (error) {
                return false;
            }
        },
        async queryTopicsChartData({ commit }) {
            try {
                const response: ResponseData = await monthnewTopics();
                const { data } = response;
                commit('setTopicsChartData', {
                    ...initState.topicsChartData,
                    ...data,
                });
                return true;
            } catch (error) {
                return false;
            }
        },
        async queryLinksChartData({ commit }) {
            try {
                const response: ResponseData = await annualnewLinks();
                const { data } = response;
                commit('setLinksChartData', {
                    ...initState.linksChartData,
                    ...data,
                });
                return true;
            } catch (error) {
                return false;
            }
        },
        async queryHotSearchData({ commit }, payload: TableListQueryParams) {
            try {       
                const response: ResponseData = await hotSearchQueryList(payload);
                const { data } = response;
                commit('setHotSearchData',{
                    ...initState.hotSearchData,
                    list: data.list || [],
                    pagination: {
                        ...initState.hotSearchData.pagination,
                        current: payload.page,
                        total: data.total || 0,
                    },
                })        
                return true;
            } catch (error) {
                return false;
            }
        },
        async queryHotTagsData({ commit }, payload: TableListQueryParams) {
            try {    
                const response: ResponseData = await hotTagsQueryList(payload);
                const { data } = response;
                commit('setHotTagsData',{
                    ...initState.hotTagsData,
                    list: data.list || [],
                    pagination: {
                        ...initState.hotTagsData.pagination,
                        current: payload.page,
                        total: data.total || 0,
                    },
                })        
                return true;
            } catch (error) {
                return false;
            }
        },
        async queryArticleHitData({ commit }, payload: TableListQueryParams) {
            try {   
                const response: ResponseData = await articleHitQueryList(payload);
                const { data } = response;
                commit('setArticleHitData',{
                    ...initState.articleHitData,
                    list: data.list || [],
                    pagination: {
                        ...initState.articleHitData.pagination,
                        current: payload.page,
                        total: data.total || 0,
                    },
                })        
                return true;
            } catch (error) {
                return false;
            }
        },
        async queryWorksHitData({ commit }, payload: TableListQueryParams) {
            try {    
                const response: ResponseData = await worksHitQueryList(payload);
                const { data } = response;
                commit('setWorksHitData',{
                    ...initState.worksHitData,
                    list: data.list || [],
                    pagination: {
                        ...initState.worksHitData.pagination,
                        current: payload.page,
                        total: data.total || 0,
                    },
                })        
                return true;
            } catch (error) {
                return false;
            }
        },


    }
}

export default StoreModel;
  