var Component = require('./Component')
var FormItem = require('./FormItem')
var manager = require('../utils/componentManager')
class Form extends Component{
    constructor(options, parent){// 根据columns初始化children
        manager.initChildrenByField(options, 'items')   
        super(options, parent)
    }
    init(){
        super.init()
        // 初始化page的table属性，一个page只有一个table
        let page = this.getPage()
        if(page){
            page.form = this
        }
    }
    getChildComponentByType(type){
        let map = {
            'form-item': FormItem
        }
        return map[type]
    }
    getTemplateHtml(){
        let options = this.options
        let model = this.getModelName()
        return `<el-form ref="${model}" inline :model="${model}" :rules="${options.rules}">
            ${this.getChildrenTemplateHtml()}
        </el-form>`
    }
    initInjectData(target){
        let model = this.getModelName()

        let formObj = {}
        this.children.forEach( child => {
            if(child.key){
                formObj[child.key] = child.defaultValue || ''
            }
        })
        target[model] = formObj
    }
    initInjectMethod(){

    }
}
module.exports = Form