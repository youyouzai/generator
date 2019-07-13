const getRoot = process.cwd();
const defaultConfig = {
    labelField: 'label',
    valueField: 'value',
    dataSuffix: 'DataSource',
    responseDataField: 'data',
    defaultClickName: 'onBtnClick',
    defaultDialogKey: 'dialog',
}
module.exports = { getRoot, defaultConfig}