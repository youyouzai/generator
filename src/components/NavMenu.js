var Component = require('./Component')
var factory = require('../utils/componentFactory')
class NavMenu extends Component{
    constructor(options, parent){
        super(options, parent)
        this.key = 'activeName'
    }
    getChildComponentByType(){
        return factory
    }
    initChildren() {
        return []
    }
    initInjectData(target){
        const menus = this.options.menus
        target['activeName'] = menus.length ? menus[0].index : ''
        target['menus'] = this.options.menus
    }
    getTemplateHtml(){
        let content = `<div class="page-container" >
            <div class="l-left" >
            <section>
                <el-menu
                :default-active="activeName"
                :default-openeds="[]"
                class="u-menu"
                @select="onMenuSelect"
                >
                <template v-for="(menu, index) in menus">
                    <el-submenu v-if="menu.children" :key="'menu-item' + index" :index="menu.index">
                    <template slot="title">
                        <i class="el-icon-reading" :class="{ [menu.icon]: true}"></i>
                        <span slot="title">{{ menu.label }}</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item
                        v-for="(submenu, index) in menu.children"
                        :key="'submenu-item' + index"
                        :index="submenu.index"
                        >
                        <i class="el-icon-reading" :class="{ [submenu.icon]: true}"></i>
                        <span slot="title">{{ submenu.label }}</span>
                        </el-menu-item>
                    </el-menu-item-group>
                    </el-submenu>
                    <el-menu-item v-if="!menu.children" :key="'submenu-item' + index" :index="menu.index">
                    <i class="el-icon-reading" :class="{ [menu.icon]: true}"></i>
                    <span slot="title">{{ menu.label }}</span>
                    </el-menu-item>
                </template>
                </el-menu>
            </section>
            </div>
            <div class="l-main">
                <router-view></router-view>
            </div>
        </div>
        `
        return content
    }
    getDataHtml(){

    }
    createElementByName(name) {
        return `<${name}></${name}>`
    }
    initInjectMethods(target) {
        target['onMenuSelect'] = `
            onMenuSelect(index) {
                this.activeName = index
                this.$router.push({name: index})
            },
        `
    }
}
module.exports = NavMenu