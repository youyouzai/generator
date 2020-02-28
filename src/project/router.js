var utils = require('../utils/util')
class Router{
    /**
     * 
     * @param [{fileName, filePath, node}] files 
     */
    constructor(files, rootFilePath){
       this.files = files
       this.rootFilePath = rootFilePath
    }
    getTemplateCode(){
        // 检测嵌套路由，只允许两层嵌套路由
        const fileMap = {}
        this.files.forEach((file)=> {
            fileMap[file.filePath] = file
        })
        const rootFiles = []
        this.files.forEach((file)=> {
            let fatherPath = file.filePath.substring(0, file.filePath.lastIndexOf('/'))
            const fatherIndexFilePath = fatherPath.substring(0, fatherPath.lastIndexOf('/'))
            const fatherPaths = [fatherPath, `${fatherIndexFilePath}/index.vue`]
            if(fatherPath = contains(fileMap, fatherPaths)) {
                if(fileMap[fatherPath].children) {
                    fileMap[fatherPath].children.push(file)
                }else {
                    fileMap[fatherPath].children = [file]
                }
            }else {
                rootFiles.push(file)
            }
        })
        // 生成code
        let importCode = ''
        this.files.forEach((file) => {
            const componentName = this.getComponentName(file)
            const relativePath = this.getRelativePath(file)
            importCode += `import ${componentName} from '@${relativePath}'
            `
        })
        let routesCode = ''
        rootFiles.forEach((file)=> {
            routesCode += this.getRoutesCode(file)
        })
        const template = `
            import Vue from 'vue'
            import Router from 'vue-router'
            ${importCode}
            Vue.use(Router)
            export default new Router({
                routes: [
                    ${routesCode}
                ]
            })
        `
        return template
    }
    getComponentName(file) {
        return utils.firstUpperCase(file.fileName)
    }
    getRelativePath(file) {
        return file.filePath.substring(file.filePath.indexOf('src') + 3)
    }
    getRoutesCode(file) {
        const componentName = this.getComponentName(file)
        const relativePath = this.getRelativePath(file)
        const path = this.getRouterPath(relativePath);
        const name = file.fileName
        const children = file.children
        let childHtml = ''
        if(children && children.length) {
            children.forEach((child) => {
                childHtml += this.getRoutesCode(child)
            })
        }
        childHtml = childHtml? `,
            children: [${childHtml}]`: ''
        return `{
            name: '${name}',
            path: '/${path}',
            component: ${componentName}${childHtml}
        },`
    }
    getRouterPath(filePath){
        // eslint-disable-next-line
        return filePath.replace(new RegExp(`^\/*${this.rootFilePath}\/*(.+).vue`, 'g'), function(match, p1){
            return p1
        });
    }
}
function contains(map, arr) {
    if(!arr || !arr.length) return false
    for(let i = 0; i< arr.length; i++) {
        if(map[arr[i]] !== undefined){
            return arr[i]
        }
    }
    return null
}
module.exports = Router