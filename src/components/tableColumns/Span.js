var Component = require('../Component')
class Span extends Component{
    constructor(options){
        super(options)
        this.parent = null
        this.type = 'table-column-span'
    }
}
module.exports = Span