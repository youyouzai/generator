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
        })
    },
    getComponentsHtml(components){
        return components.map( name => {
            name = name.replace(/[A-Z]/g, function(s1){
                return '-' + s2.toLowerCase()
            })
            return `<${name} ></${name}>`
        }).join('\n')
    },
    getComponentNamesHtml(components){
        return components.map( name => {
            return name.replace(/-([a-zA-Z])/, function(s1,s2){
                return s2.toUpperCase()
            })
        }).join(',')
    },
    getImportsHtml(components){
        return components.map( name => {
            name = name.replace(/-([a-zA-Z])/, function(s1,s2){
                return s2.toUpperCase()
            })
            return `import ${name} from './components/${name}'`
        }).join('\n')
    },
    getComputedHtml(computedMethods){
        return Object.values(computedMethods).join('\n')
    },
    getMethodsHtml(methods){
        return Object.values(methods).join('\n')
    },
    getCreatedHtml(createdMethods){
        return Object.values(createdMethods).join('\n')
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
}
module.exports = manager