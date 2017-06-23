// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import TrelloContactVue from './components/TrelloForm.vue'

Vue.config.productionTip = false

Vue.component('trello-form', TrelloContactVue)

/* eslint-disable no-new */
new Vue({
  el: '#tcv-vue'
})

// Export for package
export default TrelloContactVue
