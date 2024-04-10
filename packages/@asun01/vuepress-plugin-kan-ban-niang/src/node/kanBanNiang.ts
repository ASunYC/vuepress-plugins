import { path } from '@vuepress/utils'
import type { Plugin } from '@vuepress/core'
import { kanbanOption } from '../types'
export * from '../types'

export const kanBanNiang =
  (options?: kanbanOption): Plugin =>
  (app) => {
    return {
      name: '@asun01/vuepress-plugin-kan-ban-niang',
      define() {
        return {
          CLEAN: options?.clean || false,
          THEME: options?.theme || ['blackCat', 'whiteCat', 'haru1', 'haru2', 'haruto', 'koharu', 'izumi', 'shizuku', 'wanko', 'miku', 'z16'],
          MESSAGES: options?.messages || {
            welcome: '欢迎来到我的博客',
            home: '心里的花，我想要带你回家。',
            theme: '好吧，希望你能喜欢我的其他小伙伴。',
            close: '你知道我喜欢吃什么吗？痴痴地望着你。',
            info: '想知道关于我的更多信息吗？'
          },
          MESSAGE_STYLE: options?.messageStyle || {
            right: '68px',
            bottom: '290px'
          },
          MODEL_STYLE: options?.modelStyle || {
            right: '90px',
            bottom: '-20px',
            opacity: '0.9'
          },
          BTN_STYLE: options?.btnStyle || {
            right: '90px',
            bottom: '40px'
          },
          WIDTH: options?.width || 250,
          HEIGHT: options?.height || 320
        }
      },
      clientConfigFile: path.resolve(__dirname, '../client/config.js')
    }
  }
