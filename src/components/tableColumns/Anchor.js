var Component = require('../Component')
class Anchor extends Component{
    constructor(options, parent){
        super(options, parent)
        this.type = 'table-column-anchor'
        this.init()
    }
    getTemplateHtml(){
        let key = this.parent.options.key
        let html = `<a target="_blank" href="${this.options.url}"> <span>{{ scope.row.${key} }}</span></a>`
        return html
    }
}
module.exports = Anchor