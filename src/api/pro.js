// 导入封装的axios
import ajax from '@/utils/request'


//获取所有商品
export function proList(params) {
    return ajax({
        url: '/pro/list',
        method: 'GET'
    });
}