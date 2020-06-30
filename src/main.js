import Vue from 'vue'
import App from './App.vue'
import NorthForm, { thesisStore } from '@acklavidian/north-form'
import quizData from './assets/quiz.json'
import Vuex from 'vuex'
Vue.use(Vuex)
Vue.use(NorthForm)
Vue.config.productionTip = false
Vue.prototype.$quizData = quizData

new Vue({
  render: h => h(App),
  store: thesisStore
}).$mount('#app')
