import { login, logout, getInfo } from '@/service/user';
import { getToken, setToken, removeToken } from '@/service/lib/localToken';
import { resetRouter } from '@/router';
import { isExternal } from '@/utlis/validate';
import { serverLoginUrl, serverLogoutUrl } from '@/settings';

const state = {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
};
const mutations = {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    }
};
const actions = {
    // 用户登录
    login({ commit }, userInfo) {
        const { username, password } = userInfo;
        return new Promise((resolve, reject) => {
          login(serverLoginUrl, { username: username.trim(), password: password }).then(response => {
            const { data } = response;
            const { token } = data;
            commit('SET_TOKEN', token);
            setToken(token);
            resolve(data);
          }).catch(error => {
            reject(error);
          });
        });
    },
    
    // 获取用户信息
    getInfo({ commit }) {
        return new Promise((resolve, reject) => {
            getInfo().then(response => {
                const { data } = response;

                if (!data) {
                  reject('当前用户登入信息已失效，请重新登入再操作.');
                }

                const { roles, name, avatar } = data;

                // roles must be a non-empty array
                if (!roles || roles.length <= 0) {
                    reject('用户没有角色权限!');
                }

                commit('SET_ROLES', roles);
                commit('SET_NAME', name);
                commit('SET_AVATAR', avatar);
                resolve(data);
            }).catch(error => {               
                reject(error.msg || 'Error');
                // console.log(error);
            });
        });
    },

    // 用户退出
    logout({ commit }) {
        if (isExternal(serverLogoutUrl)) {
            commit('SET_TOKEN', '');
            commit('SET_ROLES', []);
            window.location.href = serverLogoutUrl;
        } else {
            return new Promise((resolve, reject) => {
                logout(serverLogoutUrl).then(() => {
                    commit('SET_TOKEN', '');
                    commit('SET_ROLES', []);
                    removeToken();
                    resetRouter();
                    resolve();
                }).catch(error => {
                    reject(error);
                });
            });
        }
    },
    // 删除Token
    resetToken({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        commit('SET_ROLES', []);
        removeToken();
        resolve();
      });
    }
    

};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};