// 导入封装的axios
import ajax from '@/utils/request'

// 管理系统登录接口的封装
export function loginFn(params) {
    return ajax({ 
        method: 'POST',
        url: '/admin/login',
        data: params
    })
}

//获取管理员列表
export function adminList() {
    return ajax({
        url: '/admin/list',
        method: 'GET'
    });
}

//添加管理员
export function addAdmin(params) {
    return ajax({
        url: '/admin/add',
        method: 'POST',
        data: params
    });
}

//修改管理员
export function updateAdmin(params) {
    return ajax({
        url: '/admin/update',
        method: 'POST',
        data: params
    });
}

//删除管理员
export function deleteAdmin(params) {
    return ajax({
        url: '/admin/delete',
        method: 'POST',
        data: params
    });
}

//获取用户列表
export function getUserList() {
    return ajax({
        url: '/user/list',
        method: 'GET'
    });
}



// export function okx() {
//     return ajax({
//         url: 'https://www.okx.com/api/v5/rubik/stat/trading-data/support-coin',
//         method: 'GET',
//         headers: {
//             'OK-ACCESS-KEY':'3eb826c1-0689-4c18-8a2b-cb38fbbc9ca7',
//             'OK-ACCESS-SIGN':'gKstqVwV4ZRNuAecGLCP45mEAkrNlPUK8akTahxDakY=',
//             'OK-ACCESS-TIMESTAMP':'2023-11-14T21:32:57.715Z',
//             'OK-ACCESS-PASSPHRASE':'Yifan575884.'
//         },
//             withCredentials: true
        
//     });
// }