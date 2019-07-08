var Component = require('../Component')
class Buttons extends Component{
    constructor(options, parent){
        super(options, parent)
        this.type = 'table-column-buttons'
        this.init()
    }
}
module.exports = Buttons