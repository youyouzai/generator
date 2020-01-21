
var Table = require('../components/Table')
var Form = require('../components/Form')
var Span = require('../components/formItem/Span')
var Input = require('../components/formItem/Input')
var Buttons = require('../components/formItem/Button')
var Select = require('../components/formItem/Select')
var DatePicker = require('../components/formItem/DatePicker')
var Container = require('../components/Container')
var NavMenu = require('../components/NavMenu')
var Tabs = require('../components/Tabs')
const componentFactory = {
    // 顶级容器
  0: Container, // 根组件
  1: Container, // '面板容器'
  2: Container, // '弹出框容器'
  // 容器
  6: Container, // 容器
  7: Container, // 水平布局
  8: Container, // 垂直布局
  // 基础组件
  11: Form, // 表单
  12: Table, // 表格
  13: Select, // select
  14: Input, // input
  15: DatePicker, // date
  16: Buttons, // button
  17: Span, // label
  18: Container, // breadcrumb
  101: Container, // tree
  102: Container, // tag
  103: Container, // upload
  104: Container, // switch
  105: Container, // card
  106: Container, // messageBox
  107: Container, // tooltip
  // 自定义组件
  21: Container, // my-form
  24: Container, // checkbox-group-select
  25: Container, // transfer-input
  31: Tabs, // tab组
  32: Container, // tab内容
  41: NavMenu, // 页面组
  42: Container, // 弹出框
  43: Container, // 单个页面
  // 图表
  51: Container, // 折线图
  52: Container, // 饼状图
  53: Container // 柱状图
}
// let dateTypes = ['year','month','date','dates', 'week','datetime','datetimerange', 'daterange','monthrange']
// dateTypes.forEach( type => {
//     componentFactory[type] = DatePicker
// })

module.exports = componentFactory