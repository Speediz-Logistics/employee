import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { Chart, registerables } from 'chart.js';

import '@/assets/scss/app.scss';
import '@/style/less/index.less';
import 'tdesign-vue-next/es/style/index.css';
import ElementPlus from 'element-plus';

// FontAwesome imports
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import 'mapbox-gl/dist/mapbox-gl.css';

// Add icons to the library
library.add(fas, far);
Chart.register(...registerables);


const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router);
app.use(store);
app.use(ElementPlus)

app.mount('#app');
