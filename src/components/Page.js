var Component = require('./Component')
var factory = require('../utils/componentFactory')
var manager = require('../utils/componentManager')

class Page extends Component{
    constructor(options, parent){ 
        super(options, parent)
        this.type = 'page'

        this.forms = []
        this.tables = []
        
        this.injectData ={
            loading: false
        }
        this.injectMethods = {}
        this.injectCreated = {}
        this.injectComputed = {}
        this.rely = []; // 依赖的组件
    }
    init() {
        super.init()
        if(!this.forms.length || !this.tables.length) return
        this.tables.forEach((table, index) => {
            table.relateForm =  this.forms[index] ? this.forms[index]: this.forms[0]
        })
        this.forms.forEach((form, index) => {
            form.relateTable =  this.tables[index] ? this.tables[index]: this.tables[0]
        }) 
    }
    /**每个表单对应一个table, 按索引位置进行查找 */
    initRelateTable(page, index){
        if(page.tables.length === 0) return
        this.relateTable =  page.tables[index] ? page.tables[index]: page.tables[0]
    }
    
    /**每个表格需要对应一个form, 按索引位置进行查找 */
    initRelateForm(page, index){
        if(page.forms.length === 0) return
        this.relateForm =  page.forms[index] ? page.forms[index]: page.forms[0]
    }
    completed(){
        
    }
    getChildComponentByType(type){
        return factory[type]
    }
    getTemplateHtml(){
        return `<template>
            <div v-loading="loading">
                ${this.getChildrenTemplateHtml()}
            </div>
        </template>
        <script>
             ${this.getImportsHtml()}
            export default {
                components: {
                    ${this.getComponentNamesHtml()}
                },
                props: {
                    ${this.getPropsHtml()}
                },
                data() {
                    return ${this.getDataHtml()}
                },
                computed: {
                    ${this.getComputedHtml()}
                },
                mounted(){
                    ${this.getCreatedHtml()}
                },
                methods: {
                    ${this.getMethodsHtml()}
                }
            }
        </script>
        <style lang="less">
        </style>`
    }
    getComponentsHtml(){
        // return manager.getComponentsHtml(this.rely)
    }
    getComponentNamesHtml(){
        return manager.getComponentNamesHtml(this.rely)
    }
    getImportsHtml(){
        return manager.getImportsHtml(this.rely)
    }
    getPropsHtml(){
        return ''
    }
    getDataHtml(){
        return manager.getDataHtml(this.injectData)
    }
    getComputedHtml(){
        return manager.getComputedHtml(this.injectComputed)
    }
    getCreatedHtml(){
        return manager.getCreatedHtml(this.injectCreated)
    }
    getMethodsHtml(){
        return manager.getMethodsHtml(this.injectMethods)
    }
}

module.exports = Page