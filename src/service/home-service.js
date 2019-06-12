import api from './base/api-config';

const homeService = {
    // 查询数据
    getData(parmas) {
        return api.post('/caishen/api/0.1/search/demo_list', parmas, { payload: true });
    },

    // 查询表格数据
    getTableData(parmas) {
        return api.post('/caishen/api/0.1/search/table', parmas, { payload: true });
    },

};

export default homeService;