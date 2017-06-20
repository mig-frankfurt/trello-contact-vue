// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

Vue.config.productionTip = false

Vue.component('trello-form', require('./components/TrelloForm.vue'))

/* eslint-disable no-new */
new Vue({
  el: '#vue'
})
