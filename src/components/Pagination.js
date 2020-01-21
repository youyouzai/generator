var Component = require('./Component')
class Pagination extends Component{
    constructor(options, table){  
        super(options)    
        this.type = 'pagination'
        this.table = table
    }
    initInjectData(target){
        const formKey = this.table.getFormKey()
        if(!target[formKey]){
            target[formKey] = {}
        }
        target.totalCount = 0
        target[formKey].pageNo = 1
        target[formKey].pageSize = 10
    }
    initInjectMethods(target){
        const table = this.table
        const formKey = table.getFormKey()
        let content = table ? `this.${table.getRequestFunctionName()}()`: '// todo: do something for changePage'
        target['changePage'] = `changePage(value){
            this.${formKey}.pageNo = value
            ${content}
        },`
        target['changeSize'] = `changeSize(value){
            this.${formKey}.pageSize = value
            ${content}
        },`
    }
    getTemplateHtml(){
        const formKey = this.table.getFormKey()
        return ` <div class="pagination-container">
            <el-pagination :current-page="${formKey}.pageNo" :page-size="${formKey}.pageSize" :total="totalCount" 
            :page-sizes="[10, 20, 50]" layout="total, sizes, prev, pager, next, jumper" 
            @size-change="changeSize" @current-change="changePage"></el-pagination>
        </div>`
    }
}
module.exports = Pagination