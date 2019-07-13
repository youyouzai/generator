var Component = require('./Component')
class AsyncComponent extends Component{
    constructor(options, parent){
        super(options, parent)
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
                this.${this.getDataSourceModelName()} = res.${options.dataField || this.global.responseDataField}
            });
        },`
        return html
    }
}
module.exports = AsyncComponent