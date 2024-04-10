import { path } from '@vuepress/utils'
import type { Plugin } from '@vuepress/core'
import type { BgmMusicPlayerOptions } from '../types'
export * from '../types'

export const bgmMusicPlayer =
  ({
    position = {
      left: '10px',
      bottom: '10px',
      'z-index': '999999'
    },
    audios,
    autoplay = true,
    autoShrink = false,
    shrinkMode = 'float',
    floatPosition = 'left',
    floatStyle = { bottom: '200px', 'z-index': '999999' },
    color = '#3eaf7c'
  }: BgmMusicPlayerOptions): Plugin =>
  (app) => {
    return {
      name: '@asun01/vuepress-plugin-bgm-player-next',
      define() {
        return {
          BGM_MUSIC_PLAYER: {
            position,
            audios,
            autoplay,
            autoShrink,
            shrinkMode,
            floatPosition,
            floatStyle,
            color
          }
        }
      },
      clientConfigFile: path.resolve(__dirname, '../client/config.js')
    }
  }
