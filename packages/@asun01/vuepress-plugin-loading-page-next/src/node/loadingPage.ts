import { path } from '@vuepress/utils'
import type { Plugin } from '@vuepress/core'
import { loadingOption } from '../types'
export * from '../types'

export const loadingPage =
  (options?: loadingOption): Plugin =>
  (app) => {
    return {
      name: '@asun01/vuepress-plugin-loading-page',
      clientConfigFile: path.resolve(__dirname, '../client/config.js'),
      define() {
        return {
          MODE: options?.mode || 'RotateLoading',
          COLOR: options?.color || '#3eaf7c',
          RANDOM: options?.random == undefined ? true : options?.random
        }
      }
    }
  }
