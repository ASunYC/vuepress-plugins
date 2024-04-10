import { defineClientConfig } from '@vuepress/client'
import Ribbon from './components/Ribbon.vue'
import RibbonAnimation from './components/RibbonAnimation.vue'

export default defineClientConfig({
  enhance({ app }) {
    app.component(Ribbon.name, Ribbon)
    app.component(RibbonAnimation.name, RibbonAnimation)
  },
  rootComponents: [Ribbon, RibbonAnimation]
})
