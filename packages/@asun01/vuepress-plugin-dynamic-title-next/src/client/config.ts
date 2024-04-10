import { defineClientConfig } from '@vuepress/client'
import FunnyTitle from './components/FunnyTitle.vue'

export default defineClientConfig({
  enhance({ app }) {
    app.component('FunnyTitle', FunnyTitle)
  },
  rootComponents: [FunnyTitle]
})
