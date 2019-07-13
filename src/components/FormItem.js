var Component = require('./Component')
var Span = require('./formItem/Span')
var Input = require('./formItem/Input')
var Buttons = require('./formItem/Buttons')
var Select = require('./formItem/Select')
var DatePicker = require('./formItem/DatePicker')
class FormItem extends Component{
    constructor(options, parent){
        super(options, parent)
        this.key = options.key
    }
    getChildComponentByType(type){
        let map = {
            'span': Span, 
            'input': Input,
            'select': Select,
            'buttons': Buttons,
        }
        let dateTypes = ['year','month','date','dates', 'week','datetime','datetimerange', 'daterange','monthrange']
        dateTypes.forEach( type => {
            map[type] = DatePicker
        })
        return map[type]
    }
    getTemplateHtml(){
        let options = this.options
        let labelHtml = options.label? `label="${options.label}"` : ''
        let propHtml = options.key? `prop="${options.key}"`: ''
        let content =  `<el-form-item  ${labelHtml} ${propHtml}>
            ${this.getChildrenTemplateHtml()}
        </el-form-item>`
        if(options.span){
            content = `<el-col :span="${optons.span}">
                ${content}
           </el-clo>`
        }
        
        return content
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