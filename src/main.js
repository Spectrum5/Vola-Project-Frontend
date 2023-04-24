import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'

// Importa il file CSS di Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faBars } from '@fortawesome/free-solid-svg-icons'

library.add(faBars)

createApp(App)
  .use(router)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
