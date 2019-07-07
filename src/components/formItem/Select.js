var Component = require('../Component')
/**
    type: 'dropdown', // 比如select/dropdown/dateRange
    label: 'Item 标签：', // 标签名称
    prop: '', // el-form-item对应的prop属性
    attrs: {  // 对应的element-ui的属性
        rules: []
    },
    // 数据集合对应的属性
    data: [{label: '英国',value: 'English'}, {label: '美国',value: 'American'}], // 静态数据
    url: '', // 远程请求url, 已data优先
    dataField: 'data', // 返回请求中data数组对应的字段
    labelField: 'label', // label对应的显示字段
    valueField: 'value', // value对应的显示字段
 */
class Select extends Component{
    constructor(options){
        super(options)
        this.parent = null
        this.type = 'select'
    }
    getTemplateHtml(){
        let item = this.options
        let form = this.parent.parent.options

        let label = item.labelField || 'label'
        let value = item.valueField || 'value'
        let formKey = form.model
        let dataSourceKey = formKey + 'DataSource'
        return `<el-select v-model="${formKey}.${item.prop}" ${getAttrsHtml(item.attrs)}>
                    <el-option v-for="(item, index) in ${dataSourceKey}.${item.prop}" :key="item.${value}" :label="item.${label}" :value="item.${value}"></el-option>
                </el-select>`   
    }
}
module.exports = Select