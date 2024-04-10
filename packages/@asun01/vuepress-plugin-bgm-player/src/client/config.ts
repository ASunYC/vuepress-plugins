import { defineClientConfig } from '@vuepress/client'

import BgMusicPlayer from './components/BgMusicPlayer.vue'

export default defineClientConfig({
  enhance({ app }) {
    app.component('BgMusicPlayer', BgMusicPlayer)
  },
  rootComponents: [BgMusicPlayer]
})
