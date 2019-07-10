var AsyncComponent = require('./AsyncComponent')
var TableColumn = require('./TableColumn')
var manager = require('../utils/componentManager')
/**
    key: 'table', // 列表名称
    // 数据集合对应的属性
    url: '', // 远程请求url, 已data优先
    dataField: 'data', // 返回请求中data数组对应的字段
    data: [],
    columns: [tableColumnData, tableColumnData],
    editable: false,  // 是否可编辑
    // 分页相关属性
    total: 0,
    pageSize: 10,
    pageNum: 0
 */
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
        target.total = 0
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
                    this.${this.getDataSourceModelName()} = data.${options.dataField || 'data'}
                    this.total = data.total;
                }
            }).catch(err => {
                this.loading = false;
            });
        },`
        return html
    }
}
module.exports = Table