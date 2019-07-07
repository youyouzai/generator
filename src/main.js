var data = require('./data')
var Form = require('./components/Form')
var fileUtils = require('./utils/file')
function generateCode(){
    let formData = data.data[0]
    let itemData = formData.items[0]
    let text = getHtml(formData, itemData)
    fileUtils.writeFile('form-item.vue', text)
}

generateCode()