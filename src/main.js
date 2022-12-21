import { createApp } from 'vue'
import * as Vue from 'vue'
/* import './style.css' */
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App.vue'
import router from './router'

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';


const vuetify = createVuetify({
  components,
  directives,
});


const app = createApp(App)
  app.use(vuetify)
  app.use(router)
  app.use(VueAxios, axios)

  app.provide('axios', app.config.globalProperties.axios)

  app.mount('#app')
