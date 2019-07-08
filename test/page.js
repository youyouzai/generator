
var Page = require('../src/components/Page')
var FileUtil = require('../src/utils/file')

let fileUtil = new FileUtil(__dirname + '/dist/')
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
                    key: 'country', // el-form-item对应的prop属性
                    type: 'select', // 比如select/dropdown/dateRange
                        // 数据集合对应的属性
                    data: [{label: '英国',value: 'English'}, {label: '美国',value: 'American'}], // 静态数据
                    url: '/country/list',
                    attrs: {  // 对应的element-ui的属性
                        disabled: true,
                        style: 'background-color: red'
                    },
                }]
            }]
        },
        {
            type: 'table',
            key: 'userTable',
            // 数据集合对应的属性
            url: '', // 远程请求url, 已data优先
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
                children: [{
                    type: 'span', // 默认为span, 包括anchor/img/icon/labels/buttons
                    render: ()=>{}, // 表格渲染函数，优先级最高
                    // 响应事件
                    click: ()=>{}, 
                    events: [{type: 'click', event: ()=>{}}],
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

function generateCode(){
    let page = new Page(data)
    page.init()
    fileUtil.write(data.key + '.vue', page.generateCode())
}

generateCode()