// 导入封装的axios
import ajaxOkxLink from '@/utils/requestOkxLink';

//=============================== 合约 ========================================================================
//铭刻列表
export function inscriptionsList(data) {
    return ajaxOkxLink({
        url: '/api/v5/explorer/btc/inscriptions-list',
        method: 'GET',
        data: data
    });
}

//铭文列表
export function tokenList(data) {
    return ajaxOkxLink({
        url: '/api/v5/explorer/btc/token-list',
        method: 'GET',
        data: data
    });
}
















