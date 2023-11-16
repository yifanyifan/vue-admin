// src/main.js
//解构出createApp
import { createApp } from 'vue'
//导入根组件
import App from './App.vue'
//导入路由配置
import router from './router'

//导入格式化样式文件
import 'normalize.css/normalize.css'

// 导入 element-plus 样式
import 'element-plus/dist/index.css'

// 如果 store 中只有一个 index.js 那么路径可以不写
import store from '@/store/index';


//创建一个类 app 实例
const app = createApp(App)
// 将路由挂载到app实例中
app.use(router)

// 将全局状态 store 挂载到 app 实例上
app.use(store);

// 将app实例挂载到id为app的元素上
app.mount('#app')
