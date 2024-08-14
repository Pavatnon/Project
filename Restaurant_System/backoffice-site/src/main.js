import '@/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// maincomponent

// leyout
import Leyout from '@/components/Leyout.vue'

import IconList from '@/components/icons/IconList.vue'

const app = createApp(App)


app.component('IconList', IconList)
app.component('Leyout',Leyout)

app.use(createPinia())
app.use(router)

app.mount('#app')
