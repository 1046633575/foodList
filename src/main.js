import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Swiper from './components/Swiper.vue'
import Axios from 'axios'
import VueLazyload from 'vue-lazyload'
import Card from './components/Card.vue'

// 注册全局组件
Vue.component('mySwiper', Swiper)
Vue.component('myCard', Card)

// 使用 element-ui
Vue.use(ElementUI)

// 使用 图片懒加载
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'http://47.95.5.96:8000/meituan/images/err.jpg',
  loading: 'http://47.95.5.96:8000/meituan/images/loading.gif',
  attempt: 1
})

// 使用 axios
Vue.prototype.$http = Axios
Axios.defaults.baseURL = 'http://47.95.5.96:8000/data'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
