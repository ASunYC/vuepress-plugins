import { defineClientConfig } from '@vuepress/client'

import sakura from './components/Sakura.vue'

export default defineClientConfig({
  enhance({ app }) {
    app.component('sakura', sakura)
  },
  rootComponents: [sakura]
})
