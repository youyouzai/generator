let data = {
    type: 'form',
    data: [{
        model: 'form',
        attrs: {}, // 对应的element-ui的属性
        items: [{
            type: 'dropdown', // 比如select/dropdown/dateRange
            label: '国家：', // 标签名称
            prop: 'country', // el-form-item对应的prop属性
            attrs: {  // 对应的element-ui的属性
                rules: []
            },
            // 数据集合对应的属性
            data: [{label: '英国',value: 'English'}, {label: '美国',value: 'American'}], // 静态数据
        }]
    }]
}
module.exports = data