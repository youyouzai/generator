var Component = require('./Component')
class Pagination extends Component{
    constructor(options, parent){      
        this.type = 'pagination'
        super(options, parent)
        this.init()
    }
    initChildren(){
        
    }
    getTemplateHtml(){
        
    }
}
module.exports = Pagination