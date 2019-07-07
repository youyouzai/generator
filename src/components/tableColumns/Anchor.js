var Component = require('../Component')
class Anchor extends Component{
    constructor(options){
        super(options)
        this.parent = null
        this.type = 'table-column-anchor'
    }
}
module.exports = Anchor