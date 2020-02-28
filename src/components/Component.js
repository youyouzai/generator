var util = require('../utils/util')

var {defaultConfig, getRoot, config} = require('../global')
var globalConfig = null
class Component{
    constructor(options, parent){
        this.key = options.key || options.prop
        this.parent = parent
        this.options = options
        this.children = null  
        this.defaultValue = options.defaultValue 
    }
    init(){
        this.initGlobal()
        this.initChildren()     
        this.created()   
    }
    initInject(){
        let page = this.getPage()
        if(page){
            this.injectRely(page.rely)
            this.initInjectComponents(page.injectComponents)
            this.initInjectComponentNames(page.injectComponentNames)
            this.initInjectImports(page.injectImports)
            this.initInjectData(page.injectData)
            this.initInjectComputed(page.injectComputed)
            this.initInjectMethods(page.injectMethods)
            this.initInjectCreated(page.injectCreated)
        }
    }
    initGlobal(){
        if(!globalConfig){
            globalConfig = Object.assign({}, defaultConfig, config && config.options)
        }
        this.global = globalConfig
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
    
    generateCode(){
        this.beforeGenerate()
        let html = this.getTemplateHtml()
        this.afterGenerate()
        return html
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
            let targetClass = this.getChildComponentByType(childOptions.componentType)
            if(targetClass){
                let component = new targetClass(childOptions, this)
                component.init()
                children.push(component)
            }
        })

        this.children = children
    }
    // eslint-disable-next-line
    getChildComponentByType(type){
        return Component
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
        return this.key
    }
    getDataSourceModelName(){
        return this.getModelName() + (this.global.dataSuffix || 'DataSource')
    }
    getRequestFunctionName(){
        let name = this.key? util.firstUpperCase(this.key): ''
       return `query${name}`
    }
    isPage(target){
        return target.constructor.name === 'Page'
    }
    getPage(){    
        let target = this
        while(!this.isPage(target)){
            target = target.parent
            if(!target){
                return null
            }
        }
        return target
    }
    
    getTable(){
        let page = this.getPage()
        return page? page.table: null
    }
    injectRely(){

    }
    initInjectComponents(){

    }
    initInjectComponentNames(){

    }
    initInjectImports(){
        
    }
    initInjectData(){
      
    }
    initInjectComputed(){

    }
    initInjectMethods(){

    }
    initInjectCreated(){

    }
    getForm(){
        return this.findParentByType('form')
    }
    getFormKey(){
        const form = this.getForm()
        return form ? form.getModelName() : 'form';
    }
    getFormItemKey(){
        let form = this.getForm()
        let key = this.key
        key = form? `${form.key}.${key}`: key
        return key
    }
    findParentByType(type) {
        if(!this.parent) return null
        if(this.parent.type === type) {
            return this.parent
        }else {
            return this.parent.findParentByType(type)
        }
    }
}
module.exports = Component