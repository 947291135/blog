import Vue from 'vue'
import App from './App'
import '@/static/icon/iconfont.css'
import store from './store/index.js' //vuex
import i18n from './i18n/index.js' // 国际化
Vue.config.productionTip = false
Vue.prototype.$store = store  

App.mpType = 'app'
Vue.prototype._i18n=i18n
const app = new Vue({
	store,
	i18n,
    ...App
})
app.$mount()
