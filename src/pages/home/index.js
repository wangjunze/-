import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Home from './Home';
import '../../plugins/axios'
 
Vue.config.productionTip = false;
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { Home },
  template: '<Home/>',
  render: h => h(Home)
})