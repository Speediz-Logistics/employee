import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementPlus from 'element-plus';
import '@/assets/scss/app.scss';
import '@/style/less/index.less';
import 'tdesign-vue-next/es/style/index.css';
import { Chart, registerables } from 'chart.js';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

Chart.register(...registerables);
const app = createApp(App);

// Add icons to the library
library.add(fas, far);

app.use(router);
app.use(store);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(ElementPlus);

app.mount('#app');
