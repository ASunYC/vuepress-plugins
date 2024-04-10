import { path } from '@vuepress/utils'
import type { Plugin } from '@vuepress/core'
import { sakuraOption } from '../types'
export * from '../types'

export const sakura =
  (options?: sakuraOption): Plugin =>
    (app) => {
      return {
        name: '@asun01/vuepress-plugin-sakura',
        define() {
          return {
            SAKURA_NUM: options?.sakura_num || 20,
            SAKURA_IMG: options?.sakura_img || '',
            SAKURA_SHOW: options?.sakura_show || true,
            SAKURA_ZINDEX: options?.sakura_zindex || 100
          }
        },
        clientConfigFile: path.resolve(__dirname, '../client/config.js')
      }
    }
