var Component = require('../Component')
class Buttons extends Component{
    constructor(options, parent){
        super(options, parent)
        this.type = 'table-column-buttons'
    }
    getTemplateHtml(){
        let html = '<template  slot-scope="scope">'
        let buttons = this.options.data
        for(let i = 0; i<buttons.length; i++){
            let button = buttons[i]
            html += `<el-button
                size="mini"
                @click="${this.getClickFunctionName(button)}(scope.row, scope.$index)">${button.label}</el-button>`
        }
        html += '</template>'
        return html
    }
    initInjectMethods(target){
        let html = '', buttons = this.options.data
        for(let i = 0; i<buttons.length; i++){
            let funcName = this.getClickFunctionName(buttons[i])
            html = `${funcName}(row, rowIndex){
                // todo: do something for ${funcName}
            },`
            target[funcName] = html
        } 
    }
    getClickFunctionName(button){
        return button.click || 'onBtnClick'
    }
}
module.exports = Buttons