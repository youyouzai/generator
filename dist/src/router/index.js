
            import Vue from 'vue'
            import Router from 'vue-router'
            import Configuration from '@/views/main/page/configuration.vue'
            import Component37 from '@/views/main/page/component37.vue'
            import Component38 from '@/views/main/page/component38.vue'
            import Main from '@/views/main/index.vue'
            
            Vue.use(Router)
            export default new Router({
                routes: [
                    {
            name: 'configuration',
            path: '/main/page/configuration',
            component: Configuration
        },{
            name: 'component37',
            path: '/main/page/component37',
            component: Component37
        },{
            name: 'component38',
            path: '/main/page/component38',
            component: Component38
        },{
            name: 'main',
            path: '/main/index',
            component: Main
        },
                ]
            })
        