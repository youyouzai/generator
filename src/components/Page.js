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
        this.injectData ={}
        this.injectMethods = []
        this.injectMounted = []
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
            <div>
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
                mounted(){
                    ${this.getMountedHtml()}
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
    getMountedHtml(){
        return manager.getMountedHtml(this.injectMounted)
    }
    getMethodsHtml(){
        return manager.getMethodsHtml(this.injectMethods)
    }
}
module.exports = Page