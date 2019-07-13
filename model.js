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
    type: 'page',
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

let data = {
    key: 'manager',
    type: 'page',
    children: [
        {
            type: 'form',
            key: 'form',
            attrs: {}, // 对应的element-ui的属性
            children: [{
                type: 'form-item', // 比如select/dropdown/dateRange
                label: '国家：', // 标签名称
                key: 'country', // el-form-item对应的prop属性
                children: [{
                    key: 'country',
                    type: 'select', // 比如select/dropdown/dateRange
                        // 数据集合对应的属性
                    data: [{label: '英国',value: 'English'}, {label: '美国',value: 'American'}], // 静态数据
                    url: '/country/list',
                    attrs: {  // 对应的element-ui的属性
                        disabled: true,
                        style: 'background-color: red'
                    },
                }]
            },{
                type: 'form-item', // 比如select/dropdown/dateRange
                label: '名称：', // 标签名称
                key: 'name', // el-form-item对应的prop属性
                children: [
                {
                    key: 'name',
                    type: 'input', // 比如select/dropdown/dateRange
                        // 数据集合对应的属性
                    attrs: {  // 对应的element-ui的属性
                        disabled: true,
                        style: 'background-color: red'
                    },
                }]
            },{
                type: 'form-item', // 比如select/dropdown/dateRange
                label: '选择日期：', // 标签名称
                key: 'time', // el-form-item对应的prop属性
                children: [
                {
                    key: 'time',
                    type: 'daterange', // 比如select/dropdown/dateRange
                        // 数据集合对应的属性
                    attrs: {  // 对应的element-ui的属性
                        placeholder: '请选择日期'
                    },
                }]
            },{
                type: 'form-item', // 比如select/dropdown/dateRange
                children: [
                {
                    type: 'buttons', // 比如select/dropdown/dateRange
                    data: [{type: 'submit', label: '筛选'}, {type: 'reset', label: '重置'}]
                }]
            },]
        },
        {
            type: 'table',
            key: 'userTable',
            // 数据集合对应的属性
            url: '/users/list', // 远程请求url, 已data优先
            dataField: 'data', // 返回请求中data数组对应的字段
            data: [],
            children: [{
                type: 'table-column',
                label: '名称',
                key: 'name',
                attrs: { // 对应的element-ui的属性
                    width: 180,
                    fix: true
                },
                children: [{  type: 'span'}]
            },
            {
                type: 'table-column',
                label: '商品',
                key: 'link', 
                children: [{ type: 'anchor', url: 'http://www.baidu.com'}]
            },
            {
                type: 'table-column',
                label: '图片',
                key: 'imgUrl', 
                children: [{ type: 'img', url: '/imgs/4'}]
            },
            {
                type: 'table-column',
                label: '操作',
                children: [{
                    type: 'buttons', 
                    data: [{label: '查看', click: 'onViewClick'}, {label: '编辑', click: 'onEditClick'}]
                }]
            }],
            editable: false,  // 是否可编辑
            // 分页相关属性
            total: 0,
            pageSize: 10,
            pageNum: 0
        },
    ]
}