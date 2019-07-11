var pageCount = 0
class OptionsConverter {
    initPageOptions(data){
        data = data || {}
        let options = {
            key: data.key || 'newPage' + (pageCount++),
            type: 'page',
            components: data.components,
            children: []
        }
        let formOptions = this.initFormOptions(data.form)
        if(formOptions){
            options.children.push(formOptions)
        } 
        let tableOptions = this.initTableOptions(data.table)
        if(tableOptions){
            options.children.push(tableOptions)
            // 添加分页
            options.children.push({
                type: 'pagination'
            })
        }
        return options
    }
    initTableOptions(data){
        if(!data) return null
        let options = {
            type: 'table',
            key: data.key || 'table',
            // 数据集合对应的属性
            url: data.url, // 远程请求url, 已data优先
            dataField: data.dataField || 'data', // 返回请求中data数组对应的字段
            data: [],
            children: []
        }
        if(data.columns){
            data.columns.forEach(column => {
                let columnOptions = this.initTableColumnOptions(column)
                if(columnOptions){
                    options.children.push(columnOptions)
                }   
            })
        }
        return options
    }
    initTableColumnOptions(data){
        if(!data) return null

        let filterAttrs = ['label', 'prop', 'url']
        let options = {
            type: 'table-column',
            label: data.label || '',
            key: data.prop,
            attrs:  {
                width: data.width
            },
            children: [{ 
                key: data.prop,
                type: data.type || 'span',
                data: data.data,
                attrs: this.initFilterOptions(data, filterAttrs)
            }]
        }
        // 处理特殊情况
        if(data.type === 'selection'){
            options.attrs.type = 'selection'
        }
        return options
    }

    initFormOptions(data){
        if(!data) return null
        let filterAttrs = ['key', 'items']
        let options = {
            type: 'form',
            key: data.key || 'form',
            attrs: this.initFilterOptions(data, filterAttrs),
            children: []
        }
        if(data.items){
            data.items.forEach(item => {
                let itemOptions = this.initFormItemOptions(options.key, item)
                if(itemOptions){
                    options.children.push(itemOptions)
                }   
            })
        }
        return options
    }
    initFormItemOptions(formKey, data){
        if(!data) return null
        let filterAttrs = ['type', 'url', 'data', 'default','label', 'prop']
        let options = {
            type: 'form-item', 
            label: data.label, 
            key: data.prop, 
            children: [{
                key: data.prop,
                type: data.type, 
                data: data.data, 
                url: data.url,
                attrs: this.initFilterOptions(data, filterAttrs),
            }]
        }
        return options
    }
    initFilterOptions(data, filters){
        let options = {}
        for(let key in data){
            if(filters.indexOf(key) === -1){
                options[key] = data[key]
            }
        }
        return options
    }
}
let optionsConverter = new OptionsConverter()
module.exports = optionsConverter