var Component = require('../Component')
class Icon extends Component{
    constructor(options){
        super(options)
        this.parent = null
        this.type = 'table-column-icon'
    }
}
module.exports = Icon