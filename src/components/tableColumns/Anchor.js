var Component = require('../Component')
class Anchor extends Component{
    constructor(options, parent){
        super(options, parent)
        this.type = 'table-column-anchor'
        this.init()
    }
}
module.exports = Anchor