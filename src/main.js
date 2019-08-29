import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Swiper from './components/Swiper.vue'
import Axios from 'axios'

//注册全局组件
Vue.component('mySwiper',Swiper)

//使用 element-ui
Vue.use(ElementUI)

//使用 axios
Vue.prototype.$http = Axios
Axios.defaults.baseURL = 'https://easy-mock.com/mock/5d6782294c0457664ea5c8a8/foodList'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
