
var AsyncComponent = require('../AsyncComponent')
var manager = require('../../utils/componentManager')

class SimpleSelect extends AsyncComponent{
    constructor(options, parent){
        super(options, parent)
        this.type = 'form-item-simple-select'
        this.async = Boolean(options.url)
    }
    getTemplateHtml(){
        let options = this.options

        let label = options.labelField || this.global.labelField
        let value = options.valueField || this.global.valueField
        let labelHtml = (label !== 'label') ? `label-field="${label}"`: ''
        let valueHtml = (value !== 'value') ? `value-field="${value}"`: ''

        return `<simple-select v-model="${this.getFormItemKey()}" ${manager.getAttrsHtml(options.attrs)}
            :data="${this.getDataSourceModelName()}"  ${labelHtml}  ${valueHtml} ></simple-select>`   
    }
    injectRely(target) {
        target.push('simple-select')
    }
    initInjectImports(target){
        target.push('simple-select');
    }
    initInjectComponentNames(target){
        target.push('simple-select')
    }
}
module.exports = SimpleSelect