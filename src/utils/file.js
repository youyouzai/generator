var fs = require('fs')
// eslint-disable-next-line no-undef
const getRoot = process.cwd()
class FileUtil {
  constructor () {
    this.targetDir = getRoot + '/dist/'
  }
  getAbsolutePath(path) {
    return this.targetDir + path
  }
  write (path, text) {  
    const operate = text == ''? '创建': '写入'
    try {
      let fatherDir = path.substring(0, path.lastIndexOf('/'))
      fs.mkdirSync(fatherDir, {recursive: true})
      fs.writeFileSync(path, text)
      console.log(`文件${path}${operate}成功`)
    } catch (err) {
      console.log(`文件${path}${operate}失败：` + err)
    }
  }
  writeByRelative(path, text) {
    this.write(this.targetDir + path, text)
  }
  read (path) {
    return fs.readFileSync( this.getAbsolutePath(path), {flag: 'r+', encoding: 'utf8'})
  }
  /*
   * 复制目录、子目录，及其中的文件
   * @param src {String} 要复制的目录
   * @param dist {String} 复制到目标目录
   */
  mkdir(path) {
    try {
      fs.mkdirSync(path, {recursive: true})
    } catch (err) {
      console.log(`创建文件夹${path}失败：` + err)
      return false
    }
    console.log(`创建文件夹${path}成功！`)
    return true
  }
  mkdirByRelative (path) {
    let target = this.getAbsolutePath(path)
    this.mkdir(target)
  }
  copyDir (src, dist) {
    if(!fs.existsSync(dist))  this.mkdir(dist)
    this.copy(null, src, dist, function (err) {
      console.log('错误：' + err)
    })
    console.log(`文件${dist}复制成功！`)
  }
  copy (err, src, dist, callback) {
    const _self = this
    if (err) {
      callback(err)
    } else {
      fs.readdir(src, function (err, paths) {
        if (err) {
          callback(err)
        } else {
          paths.forEach(function (path) {
            var _src = src + '/' + path
            var _dist = dist + '/' + path
            fs.stat(_src, function (err, stat) {
              if (err) {
                callback(err)
              } else {
                // 判断是文件还是目录
                if (stat.isFile()) {
                  fs.writeFileSync(_dist, fs.readFileSync(_src))
                } else if (stat.isDirectory()) {
                  // 当是目录是，递归复制
                  _self.copyDir(_src, _dist, callback)
                }
              }
            })
          })
        }
      })
    }
  }
  clean(path, execudePath){
    if(execudePath && path.indexOf(execudePath) > -1) return
    let files = [];
    if(fs.existsSync(path)){
        files = fs.readdirSync(path);
        files.forEach((file) => {
            let curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()){
                this.clean(curPath, execudePath); //递归删除文件夹
            } else {
                fs.unlinkSync(curPath); //删除文件
            }
        });
        try{
          fs.rmdirSync(path);
        }catch(err) {
          console.log(err)
        }  
    }
  }
}
module.exports = FileUtil
