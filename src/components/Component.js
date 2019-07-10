var util = require('../utils/util')
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
    initInject(){
        let page = this.getPage()
        if(page){
            this.initInjectData(page.injectData)
            this.initInjectComputed(page.injectComputed)
            this.initInjectMethods(page.injectMethods)
            this.initInjectCreated(page.injectCreated)
        }
    }
    created(){  
        
    }
    beforeGenerate(){
        this.initInject()
        if(this.children){
            this.children.forEach( child => {
                child.beforeGenerate()
            })
        }
    }
    afterGenerate(){

    }
    initChildren(){
        let children = []

        let arr = this.options.children
        if(!arr){
            return
        }
        arr.forEach( childOptions => {
            let targetClass = this.getChildComponentByType(childOptions.type)
            if(targetClass){
                let component = new targetClass(childOptions, this)
                component.init()
                children.push(component)
            }
        })

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
    getRequestFunctionName(){
        let name = this.options.key? util.firstUpperCase(this.options.key): ''
       return `query${name}`
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
    getForm(){    
        let page = this.getPage()
        return page? page.form: null
    }
    getTable(){
        let page = this.getPage()
        return page? page.table: null
    }
    initInjectData(){
      
    }
    initInjectComputed(){

    }
    initInjectMethods(){

    }
    initInjectCreated(){

    }
    
}
module.exports = Component