var util = require('../utils/util')
const  abbreviationMap = {
    disabled: true,
    multiple: true,
    clearable: true
}
var manager = {
    // 将数据转换成基本数据格式
    initOptions(){

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
        // eslint-disable-next-line
        const result = str.replace(/\"(\w+)*\":/g, function(s, target){
            return target+':'
        }).replace(/\"/g, '\'')// eslint-disable-line
        return result;
    },
    getComponentsHtml(components){
        components = util.unique(components);
        let arr =  components.map( name => {
            name = name.replace(/[A-Z]/g, function(s1){
                return '-' + s1.toLowerCase()
            })
            return `<${name} ></${name}>`
        })
        return this.combinHtmls(arr)
    },
    getComponentNamesHtml(components){
        components = util.unique(components);
        return components.map( name => {
            return manager.camelize(name)
        }).join(',')
    },
    getImportsHtml(components){
        components = util.unique(components);
        let arr = components.map( name => {
            const upperName = manager.camelize(name)
            return `import ${upperName} from './${name}';`
        })
        return this.combinHtmls(arr)
    },
    camelize(str) {
        return str.replace(/-([a-zA-Z])/g, function(s1,s2){
            return s2.toUpperCase()
        })
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
            if(value !== undefined){
                if(abbreviationMap[key] && value){
                    result += `${key} `
                }else{
                    result += `${key}="${attrs[key]}" `
                }   
            }  
        }
        return result
    },
    combinHtmls(arr){
        return arr.join('\n').replace(/\"/g, '\'') // eslint-disable-line
    }
}
module.exports = manager