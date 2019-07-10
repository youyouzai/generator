var Component = require('../Component')

class Icon extends Component{
    constructor(options, parent){
        super(options, parent)
        this.type = 'table-column-icon'
        this.init()
    }
    getTemplateHtml(){
        let key = this.parent.options.key
        let html = `<template class="menu-icon-list" slot-scope="scope">
            <i :class="scope.row.${key}"></i>
        </template>`
        return html
    }
}
module.exports = Icon