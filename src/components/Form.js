var Component = require('./Component')
var FormItem = require('./FormItem')
var manager = require('../utils/componentManager')
class Form extends Component{
    constructor(options){// 根据columns初始化children
        manager.initChildrenByField(options, 'items')
        super(options)
        this.parent = ''
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
    getDataHtml(){
        let model = this.getModelName()
        return `${model}: {
            ${this.getChildrenDataHtml()}
        },`
    }
}
module.exports = Form