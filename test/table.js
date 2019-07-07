var Table = require('../src/components/Table')
var FileUtil = require('../src/utils/file')


let fileUtil = new FileUtil(__dirname + '/dist/')
let data = {
    key: 'userTable', // 列表名称
    // 数据集合对应的属性
    url: '', // 远程请求url, 已data优先
    dataField: 'data', // 返回请求中data数组对应的字段
    data: [],
    columns: [{
        type: 'span', // 默认为span, 包括anchor/img/icon/labels/buttons
        label: '名称',
        prop: 'name',
        propFunction: ()=>{},  // 表格内容过滤函数
        render: ()=>{}, // 表格渲染函数，优先级最高
        // 响应事件
        click: ()=>{}, 
        events: [{type: 'click', event: ()=>{}}],
        attrs: { // 对应的element-ui的属性
            width: 180,
            fix: true
        }
    }],
    editable: false,  // 是否可编辑
    // 分页相关属性
    total: 0,
    pageSize: 10,
    pageNum: 0
}

function generateCode(){
    let table = new Table(data)
    let text = `<template>
        ${table.template}
    </template>`
    fileUtil.write('table-span.vue', text)
}

generateCode()