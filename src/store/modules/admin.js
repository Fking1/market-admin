import { userInfo, login, logout} from "@/api/user/user.js";
import * as types from "../mutation-types";
import { baseRouter } from "../../router";
import service from '@/utils/axios.js'

import { Message } from "element-ui";

// initial state
const state = {
    profile: null,
    token: localStorage.getItem('token'), // 登录token
    authRules: [], // 权限列表
    routers: baseRouter // 路由列表
};

// getters
const getters = {
    profile: state => state.profile,
    token: state => state.token,
    authRules: state => state.authRules,
    routers: state => state.routers
};

// actions
const actions = {
    // 用户名登录
    loginName({ commit }, profile) {
        const username = profile.username ? profile.username.trim() : "";
        const password = profile.password ? profile.password : "";
        return new Promise((resolve, reject) => {
            login(username, password)
                .then(response => {
                    commit(types.TOKEN, response.token)
                    commit(types.USERID, response.userId)
                    service.defaults.headers.common['Authorization'] = `Bearer ` + response.token
                    localStorage.setItem('token', response.token)
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    userInfo({ commit }) {
        return new Promise((resolve, reject) => {
            userInfo()
                .then(response => {
                    console.log(response)
                    commit(types.PROFILE, response.profile)
                    resolve(response.profile);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    // 登出
    loginOut({ commit }) {
        return new Promise((resolve, reject) => {
            logout()
                .then(() => {
                    commit(types.USERID, "");
                    commit(types.TOKEN, "");
                    commit(types.PROFILE, "")
                    // commit(types.RECEIVE_ADMIN_AUTH_RULES, []);
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    },

    // 前端 登出
    fedLogout({ commit }) {
        return new Promise(resolve => {
            commit(types.USERID, "")
            commit(types.TOKEN, "")
            commit(types.PROFILE, "")
            // commit(types.RECEIVE_ADMIN_AUTH_RULES, []);
            resolve();
        });
    },
    /**
     * 过滤路由列表
     * @param commit
     * @param data
     * @returns {Promise}
     */
    filterRouter({ commit }, data) {
        const { accessedRouters } = data;
        if (accessedRouters && accessedRouters.length > 0) {
            commit(types.RECEIVE_ROUTERS, accessedRouters);
        }
    }
};

// mutations
const mutations = {
    [types.TOKEN](state, token) {
        state.token = token;
        if (token === "") {
            localStorage.removeItem('token')
        }else {
            localStorage.setItem('token', token)
        } 
    },
    [types.USERID](state, userId) {
        state.userId = userId;
        if (userId === "") {
            localStorage.removeItem('userId')
        }else {
            localStorage.setItem('userId', userId)
        }
    },
    [types.PROFILE](state, profile) {
        state.profile = profile;
        if (profile === "") {
            localStorage.removeItem('profile')
        }else {
            localStorage.setItem('profile', JSON.stringify(profile))
        }
    },
    [types.RECEIVE_ROUTERS](state, routers) {
        const tempRm = baseRouter.concat(routers);
        state.routers = JSON.parse(JSON.stringify(tempRm));
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
