var fs = require("fs")
var {getRoot} = require('../global')
var config = require(getRoot + '/generator.config.js')
class FileUtil{
    constructor(){
        this.targetDir = getRoot +  ((config.output && config.output.target) || '/src/dist/')
    }
    write(path, text){
        let target = this.targetDir + path
        let fatherDir = target.substring(0, target.lastIndexOf('/'))
        try{
            fs.mkdirSync(fatherDir, { recursive: true })
            fs.writeFileSync(target, text);
            console.log(`文件${path}写入成功`)
        }catch(err){
            console.log(`文件${path}写入失败：` + err)
        }  
    }
    read(path){
        return fs.readFileSync(getRoot + path, {flag: 'r+', encoding: 'utf8'});
    }
}
module.exports = FileUtil
