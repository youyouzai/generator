class Component{
    constructor(options, parent){
        this.parent = parent
        this.options = options
        this.children = null
    }
    init(){
        this.initChildren()     
        this.created()   
    }
    created(){  
        let page = this.getPage()
        if(page){
            this.initInjectData(page.injectData)
            this.initInjectMethod()
        }
    }
    beforeGenerate(){
        
    }
    afterGenerate(){

    }
    initChildren(){
        let children = []

        let arr = this.options.children
        if(!arr){
            return
        }
        for(let i = 0; i< arr.length; i++){
            let childOptions = arr[i]
            let targetClass = this.getChildComponentByType(childOptions.type)
            if(targetClass){
                let component = new targetClass(childOptions, this)
                component.init()
                children.push(component)
            }
        }  

        this.children = children
    }
    getChildComponentByType(type){
        return Component
    }
    generateCode(){
        this.beforeGenerate()
        let html = this.getTemplateHtml()
        this.afterGenerate()
        return html
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
    isPage(target){
        return target.options.type == 'page'
    }
    getPage(){    
        let target = this
        while(target.options.type !== 'page'){
            target = target.parent
            if(!target){
                return null
            }
        }
        return target
    }
    initInjectData(){
      
    }
    initInjectMethod(){

    }
}
module.exports = Component