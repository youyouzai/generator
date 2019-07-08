var Component = require('../Component')
class Img extends Component{
    constructor(options, parent){
        super(options, parent)
        this.type = 'table-column-img'
        this.init()
    }
}
module.exports = Img