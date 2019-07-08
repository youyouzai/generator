var Component = require('../Component')
class Span extends Component{
    constructor(options, parent){
        super(options, parent)
        this.type = 'table-column-span'
    }
}
module.exports = Span