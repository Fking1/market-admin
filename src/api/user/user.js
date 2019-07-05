import axios from '@/utils/axios.js'

export function register(user) {
    return axios({
        url: "/user/register.do",
        method: "post",
        data: user
    })
}

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


export function getUsers(page, page_size) {
    return axios({
        url: "/user/users.do",
        method: "post",
        data: {
            page: page,
            page_size: page_size
        }
    })
}

export function modifyUser(user) {
    return axios({
        url: "/user/modifyUser.do",
        method: "post",
        data: user
    })
}

export function deleteUser(userId) {
    return axios({
        url: "/user/deleteUser.do",
        method: "post",
        data: {
            userId: userId
        }
    })
}

export function getUserByName(page, page_size, username) {
    return axios({
        url: "/user/getUserByName.do",
        method: "post",
        data: {
            page: page,
            page_size: page_size,
            username: username
        }
    })
}