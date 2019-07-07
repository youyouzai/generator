var Component = require('./Component')
var Table = require('./Table')
var Form = require('./Form')
var Pagination = require('../components/Pagination')
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
    constructor(options){
        super(options)
        this.parent = null
        this.type = 'page'
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
        return `{
            ${this.getChildrenDataHtml()}
        }`
    }
    getMethodsHtml(){
        return ''
    }
  
}
module.exports = Page