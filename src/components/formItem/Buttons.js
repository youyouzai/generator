
var Component = require('../Component')
var manager = require('../../utils/componentManager')
/**
 * 表单的默认按钮为'筛选/重置'
 */
class Buttons extends Component{
    constructor(options, parent){
        super(options, parent)
        this.type = 'form-item-buttons'
    }
    getTemplateHtml(){
        let html = ''
        let data = this.options.data
        for(let i = 0; i<data.length; i++){
            let button = data[i]
            html += this.getButtonHtmlByType(button)
        }
        return html 
    }

    /**
     * 
     * {this.$refs['form'].validate((valid) => {
            if (valid) {
                this.isDataLoading = true;
                this.$http.post('promotion/cart/setting-save', this.form).then(res => {
                        this.isDataLoading = false;
                        if (res.body.code == 0) {
                            this.$message.success(res.body.message || '保存成功');
                            this.tempForm = Object.assign({}, this.form);
                        } else {
                            this.$message.error(res.body.message);
                        }
                    },
                    (err) => {
                        this.$notify.error({
                            title: err.body.name || '错误',
                            message: err.body.message || '发生错误'
                        });
                        this.isDataLoading = false;
                    });
                }
            });}  
     */
    
    initInjectMethods(target){
        let form = this.getForm()
        if(!form) return
        let content,formKey = form.options.key
        this.options.data.forEach(button => {
            let funName = this.getFunctionNameByType(button.type)
            switch(button.type){
                case 'submit':
                    let table = this.getTable()
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
                    content = form? `this.$refs.${formKey}.resetFields()`: `// todo: do something for ${funName}`
                    target[funName] = `${funName}(){
                        ${content}
                    },`
                    break;
            }
        })       
    }
    getButtonHtmlByType(button){
        let typeHtml = ''
        let funName = this.getFunctionNameByType(button.type)
        switch(button.type){
            case 'submit':
                return `<el-button ${typeHtml} type="primary"  @click="${funName}">${button.label}</el-button>`;
            case 'reset':
                return `<el-button ${typeHtml} type="danger"  @click="${funName}">${button.label}</el-button>`;
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
module.exports = Buttons