
var Component = require('../Component')
var manager = require('../../utils/componentManager')
class DatePicker extends Component{
    constructor(options, parent){
        super(options, parent)
        this.type = 'form-item-date'
    }
    getTemplateHtml(){
        let options = this.options
        return `<el-date-picker v-model="${options.key}" type="${options.type}" ${manager.getAttrsHtml(options.attrs)} >
             </el-date-picker>`
    }
    
}
module.exports = DatePicker