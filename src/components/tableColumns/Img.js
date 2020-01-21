var Component = require('../Component')
class Img extends Component{
    constructor(options, parent){
        super(options, parent)
        this.type = 'table-column-img'
    }
    getTemplateHtml(){
        let key = this.parent.options.key
        let html = `<template  slot-scope="scope">
            <img class="table-img" :src="scope.row.${key}" width="90" height="120">
        </template>`
        return html
    }
    // initInjectComputed(target){
        
    //     let html = `domain() {
    //         return location.protocol + '//' + location.host + '/';
    //     },`
    //     target.domain = html
    // }
}
module.exports = Img