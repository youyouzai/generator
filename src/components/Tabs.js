var Component = require('./Component')
var factory = require('../utils/componentFactory')
class Tabs extends Component{
    constructor(options, parent){
        super(options, parent)
        this.key = 'activeName'
    }
    getChildComponentByType(){
        return factory
    }
    initChildren() {
        return []
    }
    initInjectData(target){
        const children = this.options.children
        target['activeName'] = children.length ? children[0].name : ''
    }
    getTemplateHtml(){
        let childHtml = ''
        this.options.children.forEach((child) => {  
            childHtml += `<el-tab-pane label="${child.label}" name="${child.name}">
              ${this.createElementByName(child.file.fileName)}
            </el-tab-pane>`
        })
        const modelName = this.getModelName()
        let content = `<el-tabs v-model="${modelName}" type="card">
            ${childHtml}
        </el-tabs>
        `
        return content
    }
    getDataHtml(){

    }
    createElementByName(name) {
        return `<${name}></${name}>`
    }
    injectRely(target) {
        this.options.children.forEach((child) => {  
            target.push(child.file.fileName);
        })
    }
}
module.exports = Tabs