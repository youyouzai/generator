var Component = require('../Component')
class Anchor extends Component{
    constructor(options, parent){
        super(options, parent)
        this.type = 'table-column-anchor'
        this.init()
    }
    getTemplateHtml(){
        let key = this.parent.options.key
        const hrefHtml = this.options.url ? `href="${this.options.url}"`: ''
        let html = `<template  slot-scope="scope">
            <a target="_blank" ${hrefHtml}> <span>{{ scope.row.${key} }}</span></a>
        </template>`
        return html
    }
}
module.exports = Anchor