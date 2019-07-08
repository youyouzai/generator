
var Component = require('../Component')
var manager = require('../../utils/componentManager')
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
    constructor(options, parent){
        super(options, parent)
        this.type = 'select'
        this.async = Boolean(options.url)
    }
    getTemplateHtml(){
        let options = this.options

        let label = options.labelField || 'label'
        let value = options.valueField || 'value'
        return `<el-select v-model="${options.key}" ${manager.getAttrsHtml(options.attrs)}>
                    <el-option v-for="item in ${this.getDataSourceModelName()}" :key="item.${value}" :label="item.${label}" :value="item.${value}"></el-option>
                </el-select>`   
    }
    initInjectData(target){
        let model = this.getDataSourceModelName()
        target[model] = this.options.data || []
    }
    initInjectMethods(target){
        if(!this.async) return;
        target.push(this.getGetRequestHtml())
    }
    initInjectMounted(target){
        if(!this.async) return;
        let html = `this.${this.getRequestFunctionName()}()`
        target.push(html)
    }
    getGetRequestHtml(){
        let options = this.options
        let html = `${this.getRequestFunctionName()}(){
            this.$http.get('${options.url}').then(res => {
                this.${this.getDataSourceModelName()} = res.${options.dataField || 'data'}
            });
        },`
        return html
    }
}
module.exports = Select