// 导入封装的axios
import ajax from '@/utils/request'

// 管理系统登录接口的封装
export function loginFn(params) {
    return ajax({ 
        method: 'POST',
        url: '/sys/sso/login',
        data: params,
        headers: {
            'content-type': 'multipart/form-data'
        }
    })
}
// 首页，获取用户信息
export function getUserAll() {
    return ajax({ 
        method: 'GET',
        url: '/sys/sso/info'
    })
}


// 用户管理，获取用户列表
export function adminList(urlSearch, data) {
    return ajax({
        url: '/sys/user/queryPageByParam',
        method: 'POST',
        urlSearch: urlSearch,
        data: data,
        headers: {
            'content-type': 'application/json'
        }
    });
}
//添加用户
export function addAdmin(params) {
    return ajax({
        url: '/sys/user/add',
        method: 'POST',
        data: params
    });
}
//根据用户ID获取用户权限
export function getRoleByUserId(params) {
    return ajax({
        url: '/sys/role/getRoleByUserId/id/'+params,
        method: 'GET'
    });
}





// 角色管理，获取角色列表
export function roleList(urlSearch, data) {
    return ajax({
        url: '/sys/role/queryPageByParam',
        method: 'POST',
        urlSearch: urlSearch,
        data: data,
        headers: {
            'content-type': 'application/json'
        }
    });
}
//添加角色
export function addRole(params) {
    return ajax({
        url: '/sys/role/add',
        method: 'POST',
        data: params
    });
}
//角色列表
export function roleAll(params) {
    return ajax({
        url: '/sys/role/queryByParam',
        method: 'POST',
        data: params
    });
}
//根据角色ID获取已有菜单
export function getPermissionByRoleId(params) {
    return ajax({
        url: '/sys/permission/getPermissionByRoleId/id/'+params,
        method: 'GET'
    });
}



// 菜单管理，获取菜单列表
export function permissionList(urlSearch, data) {
    return ajax({
        url: '/sys/permission/queryPageByParam',
        method: 'POST',
        urlSearch: urlSearch,
        data: data,
        headers: {
            'content-type': 'application/json'
        }
    });
}
//添加菜单
export function addPermission(params) {
    return ajax({
        url: '/sys/permission/add',
        method: 'POST',
        data: params
    });
}
//菜单列表
export function permissionAll(params) {
    return ajax({
        url: '/sys/permission/queryByParam',
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
