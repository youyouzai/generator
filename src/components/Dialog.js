var Page = require('./Page')

class Dialog extends Page{
    constructor(options, parent){ 
        super(options, parent)
        this.type = 'dialog'
        this.injectData ={
            visible: false,
            form: {}
        }
        this.injectMethods = {
            onConfirm: `onConfirm(){
                this.$emit('confirm', this.form)
            },`,
            show: `show(){
                this.visible = true
            },`,
            hide: `hide(){
                this.visible = false
            },`
        }
    }
    initInjectComponents(target){
        let key = this.options.key || this.global.defaultDialogKey
        target[key] = key
    }
    getTemplateHtml(){
        let title = this.options.title || '标题'
        return `<template>
            <el-dialog title="${title}" :visible.sync="visible"  width="75%">
                ${this.getChildrenTemplateHtml()}
                <div class="sub-container-custom text-right bottom-line">
                    <el-button type="primary" @click="onConfirm" >确定</el-button>
                    <el-button type="danger" @click="hide()">取消</el-button>
                </div>
            </el-dialog>    
        </template>
        <script>
            export default {
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
}
module.exports = Dialog