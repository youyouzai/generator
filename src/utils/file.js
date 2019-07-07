var fs = require("fs")
class FileUtil{
    constructor(targetDir){
        this.targetDir = targetDir || './dist/'
    }
    write(path, text){
        let target = this.targetDir + path
        let fatherDir = target.substring(0, target.lastIndexOf('/'))

        fs.mkdir(fatherDir, { recursive: true }, (err) => {
            if (err){
                console.log(`文件${path}创建失败: ` + err)
            }else{
                fs.writeFile(target, text,  function(err) {
                    if (err) {
                        return console.error(`文件${path}写入失败: ` + err)
                    }else{
                        console.log(`文件${path}写入成功`)
                    }
                });
            }
        });
    }
}
module.exports = FileUtil
