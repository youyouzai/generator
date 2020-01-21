var _ = require('./plugins/underscore-min')._
var {getRoot} = require('./src/global')
var Page = require('./src/components/Page')
var Router = require('./src/project/router')
var FileUtil = require('./src/utils/file')
let fileUtil = new FileUtil()

let fileCount = 1
// key=文件路径, value=node
let filePaths = []
let filePathToNodeMap = {

}
let routerFiles = []

/**生成单个page文件 */
function generatePage(node, targetFile) {
    let page = new Page(node)
    page.init()
    // 写入页面代码
    const code = page.generateCode()
    fileUtil.writeByRelative(targetFile, code)
}

/**判断是否是页面 */
function isPages(node){
    return [41].indexOf(node.componentType) > -1
}
function isPage(node){
    return [0, 32, 41, 42, 43].indexOf(node.componentType) > -1
}
/** 数据转换：确定子页面和依赖情况 */
function convertData(node) {
    node.hasDepend = false
    if(!node.children || node.children.length === 0) return
    node.children.forEach((child) => {
        convertData(child)
        if(isPage(child)){
            node.hasDepend = true
        }
        if(child.hasDepend) node.hasDepend = true
    })
}
function getFileName(node) {
    return node.prop || node.label || fileCount++
}
function createFile(fileName, filePath, node) {
    fileUtil.writeByRelative(filePath, '')
    filePaths.push(filePath)
    filePathToNodeMap[filePath] = node
    node.file = {
        filePath,
        fileName
    }
}
// 用于确定组件所属的page对象
const targetPageStack = []
function getComponentPage() {
    const length = targetPageStack.length
    return length ? targetPageStack[length -1] : null
}
function generateFiles(node, fatherPath, isClean = false) { 
    if(isClean) fileUtil.clean(fatherPath)
    // 1-1生成文件夹以及主文件
    const fileName = getFileName(node)
    const dirPath = fatherPath + '/'+ fileName
    
    const isNodePage = isPage(node)
    if(isNodePage) {
        targetPageStack.push(node)

        let filePath = ''
        if(node.hasDepend){
            filePath = dirPath + '/index.vue'
            // 循环生成子文件
            node.children.forEach((child) => {
                generateFiles(child, dirPath)
            })
        }else {
             // 1-2生成当前文件
             filePath = dirPath + '.vue'
        }
        if(!isPages(node)) {
            createFile(fileName, filePath, node)  
            node.filePath = filePath
            routerFiles.push({fileName, filePath, node})
        }
        targetPageStack.pop()
    }else {
        node.page = getComponentPage()
        if(node.hasDepend) {
            // 循环生成子文件
            node.children.forEach((child) => {
                // 若当前组件不是page，则将依赖组件放在父组件的文件夹下面
                generateFiles(child, fatherPath)
            })
        }
    }
}
/**
 * 根据json数据结构生成代码(包含多页面)
 * @param  node json数据对象
 * @returns 文件id
 */
function fillFileCode() {
    for(let i = 0; i< filePaths.length; i++) {
        let path = filePaths[i]
        generatePage(filePathToNodeMap[path], path)
    }
}

function initRouter(rootFilePath) {
    const router = new Router(routerFiles, rootFilePath)
    const code = router.getTemplateCode()
    fileUtil.writeByRelative('/src/router/index.js', code)
}
function beforeGenerate() {
    // 清空dist文件夹
    fileUtil.clean(fileUtil.targetDir, 'node_modules')
    console.log('------清空dist文件夹------')
    // copy脚手架
    fileUtil.copyDir(`${getRoot}/src/project/scaffold`, fileUtil.targetDir)
    console.log('------生成脚手架------')
}
function generateCode(node) {
    beforeGenerate()
    // ① 数据转换，确定文件和依赖组件
    convertData(node)
    // ② 生成文件目录
    filePathToNodeMap = {}
    filePaths = []
    generateFiles(node, '/src/views', true)
    // // ③ 填充文件代码
    fillFileCode(node)
    // // ④初始化router文件
    initRouter('views')
}
var fs = require('fs')
const value = fs.readFileSync( './data.json', {flag: 'r+', encoding: 'utf8'})
const node = JSON.parse(value)
generateCode(node)
module.exports = generateCode