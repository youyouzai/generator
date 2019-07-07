var Component = require('./Component')
class FormItem extends Component{
    constructor(options){
        super(options)
        this.key = options.key
        this.parent = null
    }
    getTemplateHtml(){
        let options = this.options
        return `<el-form-item label="${options.label}" prop="${options.key}">
            ${this.getChildrenTemplateHtml()}
        </el-form-item>`
    }
    getDataHtml(){
        let defaultValue = this.options.defaultValue
        if(defaultValue === undefined){
            defaultValue = '\'\''
        }
        return `${this.key}: ${defaultValue}, `
    }

}
module.exports = FormItem