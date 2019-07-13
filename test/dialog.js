
var Dialog = require('../src/components/Dialog')
var FileUtil = require('../src/utils/file')

let fileUtil = new FileUtil(__dirname + '/dist/')
let data = {
    form: {
        items: [
            {label: '国家：', span: 7, prop: 'country', type: 'select',url: '/country/list', placeholder: '请选择国家'},
            {label: '语言：', span: 7, prop: 'lang', type: 'select', default: 'American', data: [{label: '英国',value: 'English'}, {label: '美国',value: 'American'}]},
            {label: '名称：', span: 7, prop: 'name', type: 'input'},
            {label: '性别：', span: 7, prop: 'name', type: 'input'},
            {label: '籍贯：', span: 7, prop: 'name', type: 'input'},
            {label: '日期：', span: 7, prop: 'date', type: 'daterange'},
        ]
    }
}

function generateCode(){
    let dialog = new Dialog(data)
    dialog.init()
    fileUtil.write('dialog.vue', dialog.generateCode())
}

generateCode()