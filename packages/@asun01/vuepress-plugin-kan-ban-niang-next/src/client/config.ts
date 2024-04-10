import { defineClientConfig } from '@vuepress/client'
import kanBanNiang from './components/KanBanNiang.vue'

export default defineClientConfig({
  enhance({ app }) {
    app.component(kanBanNiang.name, kanBanNiang)
  },
  rootComponents: [kanBanNiang]
})
