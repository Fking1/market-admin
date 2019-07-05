import router from "@/router.js";
import store from "./store/index";
// import NProgress from "nprogress"; // Progress 进度条
// import "nprogress/nprogress.css"; // Progress 进度条样式
import { Message } from "element-ui";
import { userManage, productManage, productClassManage, supplierManage, purchaseManage, sellManage } from "./router.js";



/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param authRules
 */
function generateAsyncRouter(auth) {
    let accessRouter = []

    // 用户管理
    if (auth.userPermission === "0") {
        accessRouter = accessRouter.concat(userManage)
    }

    if (auth.productPermission === "0") {
        accessRouter = accessRouter.concat(productManage)
    }

    if (auth.productPermission === "0") {
        accessRouter = accessRouter.concat(productClassManage)
    }

    if(auth.supplierPermission === "0") {
        accessRouter = accessRouter.concat(supplierManage)
    }

    if (auth.purchasePermission === "0") {
        accessRouter = accessRouter.concat(purchaseManage)
    }

    if (auth.sellPermission === "0") {
        accessRouter = accessRouter.concat(sellManage)
    }

    return accessRouter;
}

// register global progress.
const whiteList = ["/login", "/401", "/404", "/500"]; // 不重定向白名单
router.beforeEach((to, from, next) => {

    // NProgress.start(); // 开启Progress
    if (whiteList.indexOf(to.path) !== -1) {
        // 在免登录白名单，直接进入
        next();
        return;
    }
    let userId = localStorage.getItem('userId');
    if (userId !== "undefined" && userId !== "" && userId) {
        // 判断是否有token
        if (to.path === "/login") {
            next({ path: "/" });
            // NProgress.done(); // router在hash模式下 手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
            return;
        }
        if (!store.getters.profile) {
            // 判断当前用户是否已拉取完用户信息
            store
                .dispatch("userInfo")
                .then(data => {
                    // console.log(data)
                    // 拉取user_info
                    // const authRules = data.authRules || [];
                    // if (
                    //     !(authRules instanceof Array) ||
                    //     authRules.length === 0
                    // ) {
                    //     Message.error("权限验证失败，请联系管理员~");
                    //     next({
                    //         path: "/401",
                    //         query: { noGoBack: true }
                    //     });
                    //     NProgress.done();
                    //     return;
                    // }

                    // console.log(data.auth)
                    let accessedRouters = generateAsyncRouter(data)
                    // 生成可访问的路由表
                    router.addRoutes(accessedRouters) // 动态添加可访问路由表
                    next({ ...to }) // hack方法 确保addRoutes已完成
                    // 设置左边导航栏
                    store
                        .dispatch("filterRouter", { accessedRouters })
                        .then(() => { })
                })
                .catch(() => {
                    store.dispatch("fedLogout").then(() => {
                        Message.error("验证失败,请重新登录")
                        let redirect = to.fullPath
                        store.dispatch("loginOut").then(() => {
                            next({
                                path: "/login",
                                query: { redirect: redirect }
                            });
                        });
                    });
                });
            return;
        }
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        // if (hasRole(store.getters.authRules, to.meta.authRule)) {
        //     next(); //
        //     return;
        // }

        // eslint-disable-next-line no-constant-condition
        if (true) {
            next(); //
            return;
        }
        next({
            path: "/401",
            query: { noGoBack: true }
        });
        // NProgress.done(); // router在hash模式下 手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
        return;
    }
    let redirect = to.fullPath;
    store.dispatch("loginOut").then(() => {
        next({
            path: "/login",
            query: { redirect: redirect }
        });
    }); // 否则全部重定向到登录页
    // NProgress.done(); // router在hash模式下 手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
});

router.afterEach(() => {
    // NProgress.done(); // 结束Progress
});
