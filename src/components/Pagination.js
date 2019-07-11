var Component = require('./Component')
class Pagination extends Component{
    constructor(options, parent){  
        super(options, parent)    
        this.type = 'pagination'
    }
    initInjectData(target){
        target.pagination = {
            pageNo: 1,
            pageSize: 10,
            total: 0
        }
    }
    inject(){
        
    }
    initInjectMethods(target){
        let table = this.getTable()
        let content = table ? `this.${table.getRequestFunctionName()}()`: '// todo: do something for changePage'
        let html = `changePage(){
            ${content}
        },`
        target['changePage'] = html
    }
    getTemplateHtml(){
       
        return ` <div class="text-right el-sub-container">
            <el-pagination :current-page="pagination.pageNo" :page-size="pagination.pageSize" :total="pagination.total" 
            :page-sizes="[10, 20, 50]" layout="total, sizes, prev, pager, next, jumper" 
            @size-change="changePage" @current-change="changePage"></el-pagination>
        </div>`
    }
}
module.exports = Pagination