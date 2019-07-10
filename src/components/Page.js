var Component = require('./Component')
var Table = require('./Table')
var Form = require('./Form')
var Pagination = require('../components/Pagination')
var manager = require('../utils/componentManager')
/**
    key: 'manager',
    children: [
        {
            type: 'table',
            ...tableData
        },
        {
            type: 'form',
            ...formData
        },
        {
            type: 'tab',
            ...tabData
        }
    ]  
 */
class Page extends Component{
    constructor(options, parent){ 
        super(options, parent)
        this.type = 'page'

        this.form = null
        this.table = null
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
            'pagination': Pagination
        }
        return map[type]
    }
    getTemplateHtml(){
        return `<template>
            <div v-loading="loading">
                ${this.getChildrenTemplateHtml()}
            </div>
        </template>
        <script>
            export default {
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