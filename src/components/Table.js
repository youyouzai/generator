var AsyncComponent = require('./AsyncComponent')
var TableColumn = require('./TableColumn')
var manager = require('../utils/componentManager')

class Table extends AsyncComponent{
    constructor(options, parent){
        // 根据columns初始化children
        manager.initChildrenByField(options, 'columns')
        super(options, parent)
        this.type = 'table' 
        this.async = Boolean(options.url)   
    }
    init(){
        super.init()
        // 初始化page的table属性，一个page只有一个table
        let page = this.getPage()
        if(page){
            page.table = this
        }
    }
    getChildComponentByType(type){
        let map = {
            'table-column': TableColumn
        }
        return map[type]
    }
    getTemplateHtml(){
        return `<el-table :data="${this.getModelName()}"  ${manager.getAttrsHtml(this.options.attrs)} >
            ${this.getChildrenTemplateHtml()}
        </el-table>`
    }
    initInjectData(target){
        let model = this.getModelName()
        target[model] = []
    }
    initInjectMethods(target){
        if(!this.async) return;
        let key = this.getRequestFunctionName()
        target[key] = this.getGetRequestHtml(key)
    }
    getGetRequestHtml(funcName){
        let options = this.options
        let form = this.getForm()
        let paramsHtml = form? `, {params: this.${form.getModelName()}}`: ''
        let html = `${funcName}(){
            this.$http.get('${options.url}' ${paramsHtml}).then(res => {
                this.loading = false;
                if (res.body.code === 0) {
                    let data = res.body.data;
                    this.${this.getDataSourceModelName()} = data.${options.dataField || this.global.responseDataField}
                    this.totalCount = data.total;
                }
            }).catch(err => {
                this.loading = false;
            });
        },`
        return html
    }
}
module.exports = Table