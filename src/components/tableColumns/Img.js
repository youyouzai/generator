var Component = require('../Component')
class Img extends Component{
    constructor(options){
        super(options)
        this.parent = null
        this.type = 'table-column-img'
    }
}
module.exports = Img