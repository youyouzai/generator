var Component = require('./Component')
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
class Table extends Component{
    constructor(options){
        // 根据columns初始化children
        manager.initChildrenByField(options, 'columns')
        super(options)
        this.parent = null
        this.type = 'table'
    }
    getChildComponentByType(type){
        let map = {
            'table-column': TableColumn
        }
        return map[type]
    }
    getTemplateHtml(){
        return `<el-table :data="${this.getModelName()}" border style="width: 100%">
            ${this.getChildrenTemplateHtml()}
        </el-table>`
    }
    getDataHtml(){
        let model = this.getModelName()
        return `${model}: [],`
    }
}
module.exports = Table