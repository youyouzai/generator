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
    constructor(options){
        super(options)
        this.parent = null
        this.type = 'table-column'
    }
    getChildComponentByType(type){
        let map = {
            'table-column-anchor': Anchor,
            'table-column-buttons': Buttons,
            'table-column-icon': Icon,
            'table-column-img': Img,
            'table-column-span': Span,
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

        let childrenTemplateHtml = this.getChildrenTemplateHtml()
        if(childrenTemplateHtml){
            childrenTemplateHtml = `<template  slot-scope="scope">
                ${childrenTemplateHtml}
            </template>`
        }

        return `<el-table-column  prop="${prop}" label="${label}">
            ${this.getChildrenTemplateHtml()}
        </el-table-column>`
    }
}
module.exports = TableColumn