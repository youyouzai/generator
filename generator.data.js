let data = {
    components: [], 
    form: {
        key: 'form',
        items: [
            {label: 'testxxx：', prop: 'name', type: 'input'},
            {label: '日期：', prop: 'date', type: 'daterange'},
            {label: 'select1：', prop: 'country1', type: 'select',  multiple: true, url: 'http://localhost:3000/country', placeholder: '请选择国家'},
            {label: 'simple-select：', prop: 'country2', type: 'simple-select',url: 'http://localhost:3000/country', placeholder: '请选择国家'},
            {label: '穿梭框：', prop: 'country4', type: 'simple-transfer-input',url: 'http://localhost:3000/country', placeholder: '请选择国家2'}, 
            {type: 'buttons', data: [
                {type: 'submit', label: '查询'},
                {type: 'reset', label: '重置'}
            ]}
        ]
    },
    table: {
        url: 'http://localhost:3000/products', // 远程请求url, 已data优先
        columns: [
            { type: 'selection',  width: 70},
            { label: '商品', prop: 'name',  width: 180},
            { label: '图片', prop: 'imgUrl',  type: 'img'},
            { label: '链接', prop: 'product',  type: 'anchor', url: 'http://www.google.com', width: 180},
            { label: '操作', type: 'buttons', data: [{label: '查看', click: 'onViewClick'}, {label: '编辑', click: 'onEditClick'}]},
        ]
    }
}
let dialogData = {
    key: 'my-dialog',
    form: {
        items: [
            {label: '日志类型：', span: 8, prop: 'type', type: 'span'},
            {label: '操作人：', span: 8, prop: 'operator', type: 'span'},
            {label: '更新时间：', span: 8, prop: 'updateTime', type: 'span'},
            {label: '自定义select：', prop: 'country', type: 'simple-select',url: '/country/list', placeholder: '请选择国家'},
            {label: '国家2：', prop: 'country', type: 'select',url: '/country/list', placeholder: '请选择国家1'},
        ]
    }
}
module.exports = [
    {type: 'page', data: data},
    {type: 'dialog', data: dialogData}
]