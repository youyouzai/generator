var Form = require('../src/components/Form')
var FileUtil = require('../src/utils/file')


let fileUtil = new FileUtil(__dirname + '/dist/')
let data = {
    key: 'form',
    attrs: {}, // 对应的element-ui的属性
    children: [{
        type: 'form-item', // 比如select/dropdown/dateRange
        label: '国家：', // 标签名称
        key: 'country', // el-form-item对应的prop属性
        attrs: {  // 对应的element-ui的属性
            rules: []
        },
       children: [{
        type: 'select', // 比如select/dropdown/dateRange
        key: 'country', // el-form-item对应的prop属性
        attrs: {  // 对应的element-ui的属性
            rules: []
        },
        // 数据集合对应的属性
        data: [{label: '英国',value: 'English'}, {label: '美国',value: 'American'}], // 静态数据
       }]
    }]
}

function generateCode(){
    let form = new Form(data)
    let text = `<template>
        ${form.template}
    </template>`
    fileUtil.write('form-item-select.vue', text)
}

generateCode()