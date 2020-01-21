var Component = require('./Component')
class AsyncComponent extends Component{
    constructor(options, parent){
        super(options, parent)
        if(!this.defaultValue && this.options.multiple) {
            this.defaultValue = []
        }      
    }
    initInjectData(target){
        let model = this.getDataSourceModelName()
        target[model] = this.options.data || []
    }
    initInjectMethods(target){
        if(!this.async) return;
        let key = this.getRequestFunctionName()
        target[key] = this.getGetRequestHtml(key)
    }
    initInjectCreated(target){
        if(!this.async) return;
        let key = this.getRequestFunctionName()
        let html = `this.${key}()`
        target[key] = html
    }
    getGetRequestHtml(funcName){
        let options = this.options
        let html = `${funcName}(){
            this.$http.get('${options.url}').then(res => {
                const response = res.data
                this.${this.getDataSourceModelName()} = response.${options.dataField || this.global.responseDataField}
            });
        },`
        return html
    }
}
module.exports = AsyncComponent