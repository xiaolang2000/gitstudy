import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Api  from './service/api'
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts //将echarts注册成Vue的全局属性

Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.prototype.$Api = Api
Vue.use(ElementUI)
Vue.component('echarts', echarts)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')



