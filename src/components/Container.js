var Component = require('./Component')
var Table = require('../components/Table')
var Form = require('../components/Form')
var Span = require('../components/formItem/Span')
var Input = require('../components/formItem/Input')
var Buttons = require('./formItem/Button')
var Select = require('../components/formItem/Select')
var DatePicker = require('../components/formItem/DatePicker')
var Tabs = require('../components/Tabs')
var NavMenu = require('../components/NavMenu')

class Container extends Component{
    constructor(options, parent){// 根据columns初始化children 
        super(options, parent)
    }
    initChildren(){
        let children = []

        let arr = this.options.children
        if(!arr){
            return
        }
        arr.forEach( childOptions => {
            let targetClass = this.getChildComponentByType(childOptions.componentType)
            if(targetClass){
                let component = new targetClass(childOptions, this)
                component.init()
                children.push(component)
            }
        })

        this.children = children
    }
    getChildComponentByType(type){
        const componentFactory = {
            // 顶级容器
          0: Container, // 根组件
          1: Container, // '面板容器'
          2: Container, // '弹出框容器'
          // 容器
          6: Container, // 容器
          7: Container, // 水平布局
          8: Container, // 垂直布局
          // 基础组件
          11: Form, // 表单
          12: Table, // 表格
          13: Select, // select
          14: Input, // input
          15: DatePicker, // date
          16: Buttons, // button
          17: Span, // label
          18: Container, // breadcrumb
          101: Container, // tree
          102: Container, // tag
          103: Container, // upload
          104: Container, // switch
          105: Container, // card
          106: Container, // messageBox
          107: Container, // tooltip
          // 自定义组件
          21: Container, // my-form
          24: Container, // checkbox-group-select
          25: Container, // transfer-input
          31: Tabs, // tab组
          32: Container, // tab内容
          41: NavMenu, // 页面组
          42: Container, // 弹出框
          43: Container, // 单个页面
          // 图表
          51: Container, // 折线图
          52: Container, // 饼状图
          53: Container // 柱状图
        }
       return componentFactory[type]
    }
    getTemplateHtml(){
        return `<div class="container">
            ${this.getChildrenTemplateHtml()}
        </div>`
    }
}
module.exports = Container