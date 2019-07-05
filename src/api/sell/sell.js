import axios from '@/utils/axios.js'

export function getSell(page, page_size) {
    return axios({
        url: "/sell/getSell.do",
        method: "post",
        data: {
            page: page,
            page_size: page_size
        }
    })
}

export function addSell(sell) {
    return axios({
        url: "/sell/addSell.do",
        method: "post",
        data: sell
    })
}

export function modifySell(sell) {
    return axios({
        url: "/sell/modifySell.do",
        method: "post",
        data: sell
    })
}


export function getByName(page, page_size, seller) {
    return axios({
        url: "/sell/getByName.do",
        method: "post",
        data: {
            page: page,
            page_size: page_size,
            seller: seller
        }
    })
}


export function deleteSell(sellId) {
    return axios({
        url: "/sell/removeSell.do",
        method: "post",
        data: {
            sellId: sellId
        }
    })
}