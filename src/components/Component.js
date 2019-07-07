class Component{
    constructor(options){
        this.options = options
        this.children = null
        this.template = ''
        this.childMap = {

        }
        this.init()
    }
    init(){
        this.initChildren()
        this.template = this.getTemplateHtml()
    }
    initChildren(){
        let children = []

        let arr = this.options.children
        if(!arr){
            return
        }
        for(let i = 0; i< arr.length; i++){
            let child = arr[i]
            let targetClass = this.getChildComponentByType(child.type)
            if(targetClass){
                let component = new targetClass(child)
                component.parent = this
                children.push(component)
            }
        }  

        this.children = children
    }
    getChildComponentByType(type){
        return Component
    }
    getTemplateHtml(){
        return ''
    }
    getAttrsHtml(attrs){
        let result = ' '
        for(let key in attrs){
            result += `${key} = "${attrs[key]}" `
        }
        return result
    }
    getChildrenTemplateHtml(){
        let itemsHtml = ''
        for(let i = 0; i< this.children.length; i++){
            itemsHtml += this.children[i].getTemplateHtml()
        }
        return itemsHtml
    }
    getChildrenDataHtml(){
        let html = ''
        let children = this.children
        for(let i = 0; i<children.length; i++){
            html += children[i].getDataHtml()
        }
        return html
    }
    getModelName(){
        return this.options.key
    }
    getDataSourceModelName(){
        return this.getModelName() + 'DataSource'
    }
    getDataHtml(){
        return ''
    }

}
module.exports = Component