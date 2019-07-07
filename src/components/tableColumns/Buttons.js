var Component = require('../Component')
class Buttons extends Component{
    constructor(options){
        super(options)
        this.parent = null
        this.type = 'table-column-buttons'
    }
}
module.exports = Buttons