var tableColumnData = {
    type: 'table-column',
    label: '名称',
    labelFunction: ()=>{}, // 表头内容过滤函数
    key: 'name',
    attrs: { // 对应的element-ui的属性
        width: 180,
        fix: true
    },
    children: [{
        type: 'img', // 默认为span, 包括anchor/img/icon/labels/buttons
        label: '',
        render: ()=>{}, // 表格渲染函数，优先级最高
        // 响应事件
        click: ()=>{}, 
        events: [{type: 'click', event: ()=>{}}],
    }]
}
var tableData = {
    name: 'table', // 列表名称
    // 数据集合对应的属性
    url: '', // 远程请求url, 已data优先
    dataField: 'data', // 返回请求中data数组对应的字段
    data: [],
    children: [tableColumnData, tableColumnData],
    editable: false,  // 是否可编辑
    // 分页相关属性
    total: 0,
    pageSize: 10,
    pageNum: 0
}
var formItemData = {
    key: '',
    label: 'Item标签',
    prop: '',
    children: [
        {
            type: 'select', // 比如select/dateRange
            key: 'form.country',
            attrs: {  // 对应的element-ui的属性
                rules: []
            },
            // 数据集合对应的属性
            data: [{label: '英国',value: 'English'}, {label: '美国',value: 'American'}], // 静态数据
            url: '', // 远程请求url, 已data优先
            dataField: 'data', // 返回请求中data数组对应的字段
            labelField: 'label', // label对应的显示字段
            valueField: 'value', // value对应的显示字段
        }
    ]
}
var formData = {
    title: '',
    key: '',
    attrs: {}, // 对应的element-ui的属性
    children: [formItemData, formItemData]
}
var tabData = [
    {name: 'Tab1', content: pageData},
    {name: 'Tab2', content: pageData}
]
var pageData = {
    key: 'manager',
    children: [
        {
            type: 'table',
            ...tableData
        },
        {
            type: 'form',
            ...formData
        },
        {
            type: 'tab',
            ...tabData
        }
    ]  
}