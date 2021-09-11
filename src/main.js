import { createApp } from 'vue'
import App from './App.vue'

//引入路由
import router from './router/index.js'

//引入vuex
import store from './store/index.js'

//引入全局样式
import './global.less'

//引入ant-design vue
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'


const app = createApp(App)
app.use(router).use(store).use(Antd)
app.mount('#app')