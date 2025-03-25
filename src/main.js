import { createApp } from 'vue'
import router from './app/router.js'
const app = createApp(App)
app.use(router)
app.mount('#app')

