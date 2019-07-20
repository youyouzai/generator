const {getRoot} = require('./src/global')
const data = require(getRoot + '/generator.data.js')
var Page = require('./src/components/Page')
var Dialog = require('./src/components/Dialog')
var FileUtil = require('./src/utils/file')
let fileUtil = new FileUtil()

var pageCount = 0
function generateCode(){
    let arr = data
    if(toString.call(data) !== '[object Array]'){
        if(!data.data){
            data = {
                type: 'page',
                data: data
            }
        }
        arr = [data]
    }
    arr.forEach(options=>{
        let page = null;
        switch(options.type){
            case 'dialog':
                page = new Dialog(options.data)
                break;
            default:
                page = new Page(options.data)
                break;
        }
        page.init()

        const fileName = `${options.key || options.type || ('newPage' + pageCount++)}.vue`
        const code = page.generateCode()
        fileUtil.write(fileName, code)
    })
}
generateCode()
module.exports = generateCode