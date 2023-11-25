// 导入封装的axios
import ajax from '@/utils/request';
import ajaxOkx from '@/utils/requestOkx';

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

//=============================== 用户管理 ========================================================================
// 分页列表
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
//删除用户
export function deleteAdmin(params) {
    return ajax({
        url: '/sys/user/id/'+params,
        method: 'DELETE',
        data: params
    });
}


//=============================== 角色管理 ========================================================================
// 分页列表
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
//删除角色
export function deleteRole(params) {
    return ajax({
        url: '/sys/role/id/'+params,
        method: 'DELETE',
        data: params
    });
}


//=============================== 菜单管理 ========================================================================
// 分页列表
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
// 菜单列表（树结构）
export function listTree(params) {
    return ajax({
        url: '/sys/permission/listTree',
        method: 'POST',
        data: params
    });
}
//删除菜单
export function deletePermission(params) {
    return ajax({
        url: '/sys/permission/id/'+params,
        method: 'DELETE',
        data: params
    });
}


//=============================== 合约 ========================================================================
//获取交易大数据支持币种 
export function supportCoin() {
    return ajaxOkx({
        url: '/api/v5/rubik/stat/trading-data/support-coin',
        method: 'GET'
    });
}

//杠杆多空比 
export function loanRatio(data) {
    return ajaxOkx({
        url: '/api/v5/rubik/stat/margin/loan-ratio',
        method: 'GET',
        data: data
    });
}

//合约多空持仓人数比 
export function longShortAccountRatio(data) {
    return ajaxOkx({
        url: '/api/v5/rubik/stat/contracts/long-short-account-ratio',
        method: 'GET',
        data: data
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



//获取用户列表
export function getUserList() {
    return ajax({
        url: '/user/list',
        method: 'GET'
    });
}
