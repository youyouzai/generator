
var AsyncComponent = require('../AsyncComponent')
var manager = require('../../utils/componentManager')

class SimpleTransferInput extends AsyncComponent{
    constructor(options, parent){
        super(options, parent)
        this.type = 'form-item-simple-transfer-input'
        this.async = Boolean(options.url)
        this.defaultValue = []
    }
    getTemplateHtml(){
        let options = this.options

        let label = options.labelField || this.global.labelField
        let value = options.valueField || this.global.valueField
        let labelHtml = (label !== 'label') ? `label-field="${label}"`: ''
        let valueHtml = (value !== 'value') ? `value-field="${value}"`: ''

        return `<simple-transfer-input v-model="${this.getFormItemKey()}" ${manager.getAttrsHtml(options.attrs)}
            :data="${this.getDataSourceModelName()}"  ${labelHtml}  ${valueHtml} ></simple-transfer-input>`   
    }
    injectRely(target) {
        target.push('simple-transfer-input');
        target.push('simple-transfer-dialog');
        target.push('simple-transfer');
    }
    initInjectImports(target){
        target.push('simple-transfer-input');
    }
    initInjectComponentNames(target){
        target.push('simple-transfer-input');
    }
    
}
module.exports = SimpleTransferInput