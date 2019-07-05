import axios from '@/utils/axios.js'

export function getProduct(page, page_size) {
    return axios({
        url: "/product/getProduct.do",
        method: "post",
        data: {
            page: page,
            page_size: page_size
        }
    })
}

export function addProduct(product) {
    return axios({
        url: "/product/addProduct.do",
        method: "post",
        data: product
    })
}

export function modifyProduct(product) {
    return axios({
        url: "/product/modifyProduct.do",
        method: "post",
        data: product
    })
}


export function getByName(page, page_size, productName) {
    return axios({
        url: "/product/getByName.do",
        method: "post",
        data: {
            page: page,
            page_size: page_size,
            productName: productName
        }
    })
}


export function deleteProduct(productId) {
    return axios({
        url: "/product/removeProduct.do",
        method: "post",
        data: {
            productId: productId
        }
    })
}