
var Component = require('../Component')
/**
 * 表单的默认按钮为'筛选/重置'
 */
class Button extends Component{
    constructor(options, parent){
        super(options, parent)
        this.type = 'form-item-button'
    }
    
    initInjectMethods(target){
        let form = this.getForm()
        const inputType = this.options.inputType
        if(!form || !inputType) return
        let content,formKey = this.getFormKey()
        let funName = this.getFunctionNameByType(inputType)
        const table = form.relateTable
        switch(inputType){
            case 'submit':
                content = table ? `this.${table.getRequestFunctionName()}()`: `// todo: do something for ${funName}`
                target[funName] = `${funName}(){
                    this.$refs['${formKey}'].validate( valid => {
                        if (valid) {
                            ${content}
                        }
                    })
                },`
                break;
            case 'reset':
                content = form? `this.$refs['${formKey}'].resetFields()`: `// todo: do something for ${funName}`
                target[funName] = `${funName}(){
                    ${content}
                },`
                break;
        }      
    }
    getTemplateHtml(){
        const options = this.options
        let typeHtml = ''
        let funName = this.getFunctionNameByType(options.inputType)
        switch(options.inputType){
            case 'submit':
                return `<el-button ${typeHtml} type="primary"  @click="${funName}">${options.label}</el-button>`;
            case 'reset':
                return `<el-button ${typeHtml} type="info"  @click="${funName}">${options.label}</el-button>`;
            default:
                return `<el-button ${typeHtml} type="primary">${options.label}</el-button>`;
        }
    }
    getFunctionNameByType(type){
        let map = {
            'submit': 'onSubmit',
            'reset': 'onReset'
        }
        return map[type]
    }
}
module.exports = Button