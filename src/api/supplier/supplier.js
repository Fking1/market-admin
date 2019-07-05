import axios from '@/utils/axios.js'

export function suppliers(page, page_size) {
    return axios({
        url: "/supplier/suppliers.do",
        method: "post",
        data: {
            page: page,
            page_size: page_size
        }
    })
}

export function addSupplier(supplier) {
    return axios({
        url: "/supplier/addSupplier.do",
        method: "post",
        data: supplier
    })
}

export function modifySupplier(supplier) {
    return axios({
        url: "/supplier/modifySupplier.do",
        method: "post",
        data: supplier
    })
}


export function getSupplierByName(page, page_size, supplierName) {
    return axios({
        url: "/supplier/getByName.do",
        method: "post",
        data: {
            page: page,
            page_size: page_size,
            supplierName: supplierName
        }
    })
}


export function deleteSupplier(supplierId) {
    return axios({
        url: "/supplier/removeSupplier.do",
        method: "post",
        data: {
            supplierId: supplierId
        }
    })
}

// export function modifyUser(user) {
//     return axios({
//         url: "/user/modifyUser.do",
//         method: "post",
//         data: user
//     })
// }

// export function deleteUser(userId) {
//     return axios({
//         url: "/user/deleteUser.do",
//         method: "post",
//         data: {
//             userId: userId
//         }
//     })
// }

// export function getUserByName(page, page_size, username) {
//     return axios({
//         url: "/user/getUserByName.do",
//         method: "post",
//         data: {
//             page: page,
//             page_size: page_size,
//             username: username
//         }
//     })
// }