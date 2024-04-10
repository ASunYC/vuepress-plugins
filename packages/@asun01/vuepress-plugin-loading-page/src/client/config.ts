import { defineClientConfig } from '@vuepress/client'
import loadingPage from './components/LoadingPage.vue'

export default defineClientConfig({
  enhance({ app }) {
    app.component("LoadingPage", loadingPage)
  }
})
