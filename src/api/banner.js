// 导入封装的axios
import ajax from '@/utils/request'

//获取轮播图列表
export function getBannerList() {
    return ajax({
        url: '/banner/list',
        method: 'GET'
    });
}

//添加轮播图
export function addBanner(params) {
    return ajax({
        url: '/banner/add',
        method: 'POST',
        data: params
    });
}