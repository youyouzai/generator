var manager = {
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
    getMethodsHtml(methods){
        return JSON.stringify(methods)
    }
}
module.exports = manager