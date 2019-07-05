import axios from '@/utils/axios.js'

export function getPurchase(page, page_size) {
    return axios({
        url: "/purchase/getPurchase.do",
        method: "post",
        data: {
            page: page,
            page_size: page_size
        }
    })
}

export function addPurchase(purchase) {
    return axios({
        url: "/purchase/addPurchase.do",
        method: "post",
        data: purchase
    })
}

export function modifyPurchase(purchase) {
    return axios({
        url: "/purchase/modifyPurchase.do",
        method: "post",
        data: purchase
    })
}


export function getByName(page, page_size, purchaser) {
    return axios({
        url: "/purchase/getByName.do",
        method: "post",
        data: {
            page: page,
            page_size: page_size,
            purchaser: purchaser
        }
    })
}


export function deletePurchase(purchaseId) {
    return axios({
        url: "/purchase/removePurchase.do",
        method: "post",
        data: {
            purchaseId: purchaseId
        }
    })
}