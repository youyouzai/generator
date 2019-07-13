const  abbreviationMap = {
    disabled: true,
    multiple: true,
    clearable: true
}
var manager = {
    // 将数据转换成基本数据格式
    initOptions(options){

    },
    initChildrenByField(options, field){
        let arr = options[field]
        if(toString.call(arr) !=='[object Array]' ){
            return
        }
        let map = {
            'items': 'form-item',
            'columns': 'table-column'
        }
        let children = []
        for(let i = 0; i<arr.length; i++){
            let item = arr[i]
            let target = {
                type: map[field],
                key: item.key,
                label: item.label,
                children: [{
                    ...item
                }]
            }
            children.push(target)
        }
        options.children = children
    },
    getDataHtml(data){
        let str =  JSON.stringify(data)
        return str.replace(/\"(\w+)\":/g, function(s, target){
            return target+':'
        }).replace(/\"/g, '\'')
    },
    getComponentsHtml(components){
        let arr =  components.map( name => {
            name = name.replace(/[A-Z]/g, function(s1){
                return '-' + s2.toLowerCase()
            })
            return `<${name} ></${name}>`
        })
        return this.combinHtmls(arr)
    },
    getComponentNamesHtml(components){
        return components.map( name => {
            return name.replace(/-([a-zA-Z])/, function(s1,s2){
                return s2.toUpperCase()
            })
        }).join(',')
    },
    getImportsHtml(components){
        let arr = components.map( name => {
            name = name.replace(/-([a-zA-Z])/, function(s1,s2){
                return s2.toUpperCase()
            })
            return `import ${name} from './components/${name}'`
        })
        return this.combinHtmls(arr)
    },
    getComputedHtml(computedMethods){
        let arr =  Object.values(computedMethods)
        return this.combinHtmls(arr)
    },
    getMethodsHtml(methods){
        let arr =  Object.values(methods)
        return this.combinHtmls(arr)
    },
    getCreatedHtml(createdMethods){
        let arr =  Object.values(createdMethods)
        return this.combinHtmls(arr)
    },
    getAttrsHtml(attrs){
        let result = ''
        for(let key in attrs){
            let value = attrs[key]
            if(abbreviationMap[key] && value){
                result += `${key} `
            }else{
                result += `${key}="${attrs[key]}" `
            }   
        }
        return result
    },
    combinHtmls(arr){
        return arr.join('\n').replace(/\"/g, '\'')
    }
}
module.exports = manager