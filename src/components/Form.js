var Component = require('./Component')
var Span = require('../components/formItem/Span')
var Input = require('../components/formItem/Input')
var Button = require('../components/formItem/Button')
var Select = require('../components/formItem/Select')
var DatePicker = require('../components/formItem/DatePicker')
class Form extends Component{
    constructor(options, parent){
        super(options, parent)
        this.relateTable = null
    }
    init(){
        super.init()
        this.type = 'form'
        // 初始化page的table属性，一个page只有一个table
        let page = this.getPage()
        if(page){
            page.forms.push(this)
        }
        this.initValidator()
    } 
    initChildren() {
        super.initChildren()
        this.initBtns()
    }
    initBtns(){
        // 添加confirm按钮
        const confirmBtn = new Button({
            componentType: 16,
            inputType: 'submit',
            label: '筛选'
        }, this)
        // 添加cancel按钮
        const cancelBtn = new Button({
            componentType: 16,
            inputType: 'reset',
            label: '重置'
        }, this)
        confirmBtn.init()
        cancelBtn.init()
        this.confirmBtn = confirmBtn
        this.cancelBtn = cancelBtn
    }
    
    initValidator() {
        // 暂时只检测是否必填
        const validataor = {}
        this.options.children.forEach((child) => {
            if(child.required) {
                validataor[child.prop] = [{required: true, message: `${child.label}不能为空`}]
            }
        })
        this.validataor = validataor
        this.hasRules = Object.keys(this.validataor).length > 0
    }
    getChildComponentByType(type) {
        const factory = {
            // 基础组件
            13: Select, // select
            14: Input, // input
            15: DatePicker, // date
            16: Button, // button
            17: Span, // label
        }
        return factory[type]
    }
    getTemplateHtml(){
        let model = this.getModelName() || 'form'
        const rulesHtml = this.hasRules ? `:rules="${this.getRulesModelName()}"` : ''

        let childHtml = ''
        this.children.forEach((child)=> {
            childHtml += this.getItemTemplateHtml(child)
        })

        return `<div class="form-container">
            <el-form ref="${model}" inline :model="${model}" ${rulesHtml}>
                ${childHtml}
                <el-form-item>
                ${this.confirmBtn.getTemplateHtml()}
                ${this.cancelBtn.getTemplateHtml()}
                </el-form-item>
            </el-form>
        </div>`
    }
    getRulesModelName() {
        let model = this.getModelName() || 'form'
        let page = this.getPage()
        if(page){
            return page.forms.length > 1? `${model}Rules` : 'rules'
        }
    }
    getItemTemplateHtml(item){
        const options = item.options
        let labelHtml = options.label? `label="${options.label}"` : ''
        let propHtml = options.prop? `prop="${options.prop}"`: ''
        let content =  `<el-form-item  ${labelHtml} ${propHtml}>
            ${item.getTemplateHtml()}
        </el-form-item>`
        return content
    }
    initInjectData(target){
        let model = this.getModelName()

        let formObj = {}
        this.children.forEach( child => {
            if(child.key){
                formObj[child.key] =this.getDefaultValue(child)
            }
        })
        target[model] = formObj

        if(this.hasRules) {
            target[this.getRulesModelName()] = this.validataor
        }

        this.confirmBtn.initInjectData(target)
        this.cancelBtn.initInjectData(target)
    }
    getDefaultValue(item) {
        let defaultValue = item.defaultValue
        if(!defaultValue) {
            const attrs = item.options.attrs
            defaultValue = attrs && attrs.multiple ? [] : ''
        }
        return defaultValue
    }
    initInjectMethods(target){
        this.confirmBtn.initInjectMethods(target)
        this.cancelBtn.initInjectMethods(target)
    }
}
module.exports = Form