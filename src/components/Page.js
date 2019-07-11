var Component = require('./Component')
var Table = require('./Table')
var Form = require('./Form')
var Pagination = require('../components/Pagination')
var manager = require('../utils/componentManager')
var converter = require('../utils/optionsConverter')

class Page extends Component{
    constructor(options, parent){ 
        options = converter.initPageOptions(options)
        super(options, parent)
        this.type = 'page'

        this.form = null
        this.table = null
        this.injectComponents = options.components || []
        this.injectData ={
            loading: false
        }
        this.injectMethods = {}
        this.injectCreated = {}
        this.injectComputed = {}
    }
    completed(){
        
    }
    getChildComponentByType(type){
        let map = {
            'form': Form,
            'table': Table,
            'pagination': Pagination,
        }
        return map[type]
    }
    getTemplateHtml(){
        return `<template>
            <div v-loading="loading">
                ${this.getChildrenTemplateHtml()}
                ${this.getComponentsHtml()}
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
        return manager.getComponentsHtml(this.injectComponents)
    }
    getComponentNamesHtml(){
        return manager.getComponentNamesHtml(this.injectComponents)
    }
    getImportsHtml(){
        return manager.getImportsHtml(this.injectComponents)
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