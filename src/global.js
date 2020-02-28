var fs= require("fs")
var config  = {} // TODO: 加载外部配置文件
var defaultConfig = {
    labelField: 'label',
    valueField: 'value',
    dataSuffix: 'DataSource',
    responseDataField: 'list',
    defaultClickName: 'onBtnClick',
    defaultDialogKey: 'dialog',
}
module.exports = { 
    // eslint-disable-next-line no-undef
    getRoot: process.cwd(), 
    defaultConfig,
    config
}
