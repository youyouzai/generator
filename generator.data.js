let data = {
    components: ['my-dialog'], 
    form: {
        key: 'form',
        items: [
            {label: '国家sss：', prop: 'country', type: 'select',url: '/country/list', placeholder: '请选择国家'},
            {label: '语言11：', prop: 'lang222', type: 'select', default: 'American', data: [{label: '英国',value: 'English'}, {label: '美国',value: 'American'}]},
            {label: '名称：', prop: 'name', type: 'input'},
            {label: '日期：', prop: 'date', type: 'daterange'},
        ]
    },
    table: {
        url: '/users/list', // 远程请求url, 已data优先
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
        ]
    }
}
module.exports = [
    {type: 'page', data: data},
    {type: 'dialog', data: dialogData}
]