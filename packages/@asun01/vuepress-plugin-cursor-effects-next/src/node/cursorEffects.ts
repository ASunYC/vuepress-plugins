import { path } from '@vuepress/utils'
import type { Plugin } from '@vuepress/core'
import type { effectOption } from '../types'
export * from '../types'

export const cursorEffects =
  (options: effectOption): Plugin =>
  (app) => {
    return {
      name: '@asun01/vuepress-plugin-cursor-effects',
      define() {
        return {
          SIZE: options.size || 2,
          SHAPE: options.shape || 'star',
          ZINDEX: options.zIndex || 999999999
        }
      },
      clientConfigFile: path.resolve(__dirname, '../client/config.js')
    }
  }
