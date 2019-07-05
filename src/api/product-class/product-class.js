import axios from '@/utils/axios.js'

export function getProductClass(page, page_size) {
    return axios({
        url: "/product-class/getProductClass.do",
        method: "post",
        data: {
            page: page,
            page_size: page_size
        }
    })
}

export function addProductClass(productClass) {
    return axios({
        url: "/product-class/addProductClass.do",
        method: "post",
        data: productClass
    })
}

export function modifyProductClass(productClass) {
    return axios({
        url: "/product-class/modifyProductClass.do",
        method: "post",
        data: productClass
    })
}


export function getByName(page, page_size, className) {
    return axios({
        url: "/product-class/getByName.do",
        method: "post",
        data: {
            page: page,
            page_size: page_size,
            className: className
        }
    })
}


export function deleteProductClass(classId) {
    return axios({
        url: "/product-class/removeProductClass.do",
        method: "post",
        data: {
            classId: classId
        }
    })
}