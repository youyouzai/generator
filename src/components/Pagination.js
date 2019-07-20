var Component = require('./Component')
class Pagination extends Component{
    constructor(options, parent){  
        super(options, parent)    
        this.type = 'pagination'
    }
    initInjectData(target){
        target.totalCount = 0
        const formKey = this.getFormKey()
        if(!target[formKey]){
            target[formKey] = {}
        }
        target[formKey].pageNo = 1
        target[formKey].pageSize = 10
    }
    initInjectMethods(target){
        const formKey = this.getFormKey()
        let table = this.getTable()
        let content = table ? `this.${table.getRequestFunctionName()}()`: '// todo: do something for changePage'
        target['changePage'] = `changePage(value){
            this.${formKey}.pageNo = value
            ${content}
        },`
        target['changeSize'] = `changePage(value){
            this.${formKey}.pageSize = value
            ${content}
        },`
    }
    getTemplateHtml(){
        const formKey = this.getFormKey()
        return ` <div class="text-right el-sub-container">
            <el-pagination :current-page="${formKey}.pageNo" :page-size="${formKey}.pageSize" :total="totalCount" 
            :page-sizes="[10, 20, 50]" layout="total, sizes, prev, pager, next, jumper" 
            @size-change="changeSize" @current-change="changePage"></el-pagination>
        </div>`
    }
    getFormKey(){
        const form = this.getForm()
        return form ? form.getModelName() : 'form';
    }
}
module.exports = Pagination