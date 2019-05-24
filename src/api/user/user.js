import axios from '@/utils/axios.js'

export function login(username, password) {
    return axios({
        url: "/user/login.do",
        method: "post",
        data: {
            username: username,
            password: password
        }
    })
}

export function userInfo() {
    return axios({
        url: "/user/profile.do",
        method: "get",
    })
}


export function logout() {
    return axios({
        url: "/user/logout.do",
        method: "post",
    })
}