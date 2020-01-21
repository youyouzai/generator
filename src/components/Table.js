var AsyncComponent = require('./AsyncComponent')
var Span = require('../components/formItem/Span')
var Input = require('../components/formItem/Input')
var Buttons = require('./formItem/Button')
var Select = require('../components/formItem/Select')
var DatePicker = require('../components/formItem/DatePicker')
var manager = require('../utils/componentManager')
var Pagination = require('./Pagination')

class Table extends AsyncComponent{
    constructor(options, parent){
        super(options, parent)
        this.type = 'table' 
        this.async = Boolean(options.url)  
        this.relateForm = null 
        this.pagination = null
    }
    init(){
        super.init()
        // 初始化page的table属性
        let page = this.getPage()
        if(page){
            page.tables.push(this)
        }
        this.initPagination()
    }
    initPagination() {
        if(!this.options.url) return
        this.pagination =  new Pagination(this.options, this)
        this.pagination.init()
    }
    getModelName(){
        return this.key || 'table'
    }
    getChildComponentByType(type){
        const factory = {
            // 基础组件
            13: Select, // select
            14: Input, // input
            15: DatePicker, // date
            16: Buttons, // button
            17: Span, // label
        }
        return factory[type]
    }
    getTemplateHtml(){
        let childHtml = ''
        this.options.columns.forEach((child)=> {
            childHtml += this.getColumnTemplateHtml(child)
        })
        const paginationHtml = this.pagination ? this.pagination.getTemplateHtml() :''
        return `<div class="table-container">
            <el-table :data="${this.getDataSourceModelName()}"  ${manager.getAttrsHtml(this.options.attrs)} >
                ${childHtml}
            </el-table>
        </div>
        ${paginationHtml}`
    }
    getColumnTemplateHtml(options){
        let label = options.label
        if( options.labelFunction){
            label = options.labelFunction(label)
        }
        
        let prop = options.prop
        let propHtml = prop? `prop="${prop}"` : ''
        let labelHtml = label? `label="${label}"` : ''
        return `<el-table-column  ${propHtml} ${labelHtml} ${manager.getAttrsHtml(this.options.attrs)}>
            ${this.getRenderTemplateHtml(options)}
        </el-table-column>` 
    }
    
    getRenderTemplateHtml() {
        return ''
    }
    initInjectData(target){
        let model = this.getDataSourceModelName()
        target[model] = this.options.data || []

        if(this.pagination) {
            this.pagination.initInjectData(target)
        }
    }
    initInjectMethods(target){
        if(!this.async) return;
        let key = this.getRequestFunctionName()
        target[key] = this.getGetRequestHtml(key)

        if(this.pagination) {
            this.pagination.initInjectMethods(target)
        }
    }
    getGetRequestHtml(funcName){
        let options = this.options
        let form = this.relateForm
        let paramsHtml = form? `,  this.${form.getModelName()}`: ''
        let html = `${funcName}(){
            this.$get('${options.url}' ${paramsHtml}).then(res => {
                this.loading = false;
                this.${this.getDataSourceModelName()} = res.${options.dataField || this.global.responseDataField}
                this.totalCount = res.totalCount;
            }).catch(() => {
                this.loading = false;
            });
        },`
        return html
    }
    getForm(){
        return this.relateForm
    }
}
module.exports = Table