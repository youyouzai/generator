
var Component = require('../Component')
var manager = require('../../utils/componentManager')
class Input extends Component{
    constructor(options, parent){
        super(options, parent)
        this.type = 'form-item-input'
    }
    getTemplateHtml(){
        let options = this.options
        return `<el-input v-model="${this.getFormItemKey()}" ${manager.getAttrsHtml(options.attrs)}></el-input>`   
    }
    
}
module.exports = Input