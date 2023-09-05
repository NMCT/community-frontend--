import { createApp } from 'vue'

import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { plugin, defaultConfig } from '@formkit/vue'
import config from '../formkit.config.ts'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import './assets/style.css'
import App from '@/App.vue'

import { useFirebase } from '@/composables/useFirebase.ts'
import { router } from '@/bootstrap/router.ts'
import { useFirstLogin } from '@/composables/useFirstLogin.ts'

library.add(faSpinner)

const { restoreLogin, MicrosoftLoginResult } = useFirebase()
const { postFirstLogin } = useFirstLogin()
await restoreLogin()
postFirstLogin()
MicrosoftLoginResult().then(user => {
  console.log('MicrosoftLoginResult', user)
})

createApp(App)
  .use(router)
  .use(autoAnimatePlugin)
  // .use(plugin, defaultConfig({
  //     theme: 'tailwindcss/genesis',
  // }))
  .use(plugin, defaultConfig(config))
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
