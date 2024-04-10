import { path } from '@vuepress/utils'
import type { Plugin } from '@vuepress/core'
import { ribbonDataOption } from '../types'
export * from '../types'

export const ribbon =
  (options?: ribbonDataOption): Plugin =>
  (app) => {
    return {
      name: '@asun01/vuepress-plugin-ribbon',
      define() {
        return {
          RIBBON_SIZE: options?.size || 90,
          RIBBON_OPACITY: options?.opacity || 0.65,
          RIBBON_Z_INDEX: options?.zIndex || 100,
          RIBBON_OPTIONS: options?.option || {
            // 色带HSL饱和度
            colorSaturation: '80%',
            // 色带HSL亮度量
            colorBrightness: '60%',
            // 带状颜色不透明度
            colorAlpha: 0.65,
            // 在HSL颜色空间中循环显示颜色的速度有多快
            colorCycleSpeed: 6,
            // 从哪一侧开始Y轴 (top|min, middle|center, bottom|max, random)
            verticalPosition: 'random',
            // 到达屏幕另一侧的速度有多快
            horizontalSpeed: 200,
            // 在任何给定时间，屏幕上会保留多少条带
            ribbonCount: 2,
            // 添加笔划以及色带填充颜色
            strokeSize: 0,
            // 通过页面滚动上的因子垂直移动色带
            parallaxAmount: -0.5,
            // 随着时间的推移，为每个功能区添加动画效果
            animateSections: true
          },
          RIBBON_SHOW: options?.ribbonShow || false,
          RIBBONANIMATION_SHOW: options?.ribbonAnimationShow || true
        }
      },
      clientConfigFile: path.resolve(__dirname, '../client/config.js')
    }
  }
