var Component = require('./Component')
var Select = require('./formItem/Select')
class FormItem extends Component{
    constructor(options, parent){
        super(options, parent)
        this.key = options.key
    }
    getChildComponentByType(type){
        let map = {
            'select': Select,
        }
        return map[type]
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