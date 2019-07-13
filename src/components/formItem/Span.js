var Component = require('../Component')
class Span extends Component{
    constructor(options, parent){
        super(options, parent)
        this.type = 'form-item-span'
    }
    getTemplateHtml(){
        return `{{ ${this.getFormItemKey()} }}`   
    }
}
module.exports = Span