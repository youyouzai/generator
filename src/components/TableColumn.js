var Component = require('./Component')
var Anchor = require('./tableColumns/Anchor')
var Buttons = require('./tableColumns/Buttons')
var Icon = require('./tableColumns/Icon')
var Img = require('./tableColumns/Img')
var Span = require('./tableColumns/Span')
/**
    type: 'img', // 默认为span, 包括anchor/img/icon/labels/buttons
    label: '',
    labelFunction: ()=>{}, // 表头内容过滤函数
    prop: '',
    propFunction: ()=>{},  // 表格内容过滤函数
    render: ()=>{}, // 表格渲染函数，优先级最高
    // 响应事件
    click: ()=>{}, 
    events: [{type: 'click', event: ()=>{}}],
    attrs: { // 对应的element-ui的属性
        width: 180,
        fix: true
    }
 */
class TableColumn extends Component{
    constructor(options, parent){
        super(options, parent)
        this.type = 'table-column'
    }
    getChildComponentByType(type){
        let map = {
            'anchor': Anchor,
            'buttons': Buttons,
            'icon': Icon,
            'img': Img,
            'span': Span,
        }
        return map[type]
    }
    getTemplateHtml(){
        let options = this.options
        let label = options.label
        if( options.labelFunction){
            label = options.labelFunction(label)
        }
        
        let prop = options.key
        let propHtml = prop? `prop="${prop}"` : ''
        return `<el-table-column  ${propHtml} label="${label}">
            ${this.getChildrenTemplateHtml()}
        </el-table-column>` 
    }
}
module.exports = TableColumn