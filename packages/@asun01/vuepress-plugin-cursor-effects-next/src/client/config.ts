import { defineClientConfig } from '@vuepress/client'

import CursorEffects from './components/CursorEffects.vue'

export default defineClientConfig({
  enhance({ app }) {
    app.component('CursorEffects', CursorEffects)
  },
  rootComponents: [CursorEffects]
})
