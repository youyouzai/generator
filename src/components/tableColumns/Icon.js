var Component = require('../Component')
class Icon extends Component{
    constructor(options, parent){
        super(options, parent)
        this.type = 'table-column-icon'
        this.init()
    }
}
module.exports = Icon