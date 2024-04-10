# vuepress-plugin-ribbon

> vuepress plugin ribbon for vuepress v2.x

## install

```
yarn add @asun01/vuepress-plugin-ribbon
or
npm install @asun01/vuepress-plugin-ribbon
```

## usage

1、Import dependent packages into the configuration file config ts

```
import { ribbon } from '@asun01/vuepress-plugin-ribbon'
```

2、Refer to vuepress 2 X Official Website configuration plug-in

```ts
plugins: [
    ribbon()
  ]

```

3、Configuration parameter type declaration

```ts
export interface ribbonOption {
  /*
   * 色带HSL饱和度,默认：80%
   */
  colorSaturation: string
  /*
   * 色带HSL亮度量，默认：60%
   */
  colorBrightness: string
  /*
   * 带状颜色不透明度，默认0.65
   */
  colorAlpha: number
  /*
   * 在HSL颜色空间中循环显示颜色的速度有多快，默认：6
   */
  colorCycleSpeed: number
  /*
   * 从哪一侧开始Y轴 (top|min, middle|center, bottom|max, random)，默认：random
   */
  verticalPosition: string
  /*
   * 到达屏幕另一侧的速度有多快，默认：200
   */
  horizontalSpeed: number
  /*
   * 在任何给定时间，屏幕上会保留多少条带，默认：2
   */
  ribbonCount: number
  /*
   * 添加笔划以及色带填充颜色，默认：0
   */
  strokeSize: number
  /*
   * 通过页面滚动上的因子垂直移动色带，默认：-0.5
   */
  parallaxAmount: number
  /*
   * 随着时间的推移，为每个功能区添加动画效果，默认：true
   */
  animateSections: true
}

export interface ribbonDataOption {
  /*
   * 尺寸大小,默认：90
   */
  size: number

  /*
   * 透明度，默认：0.65
   */
  opacity: number
  /*
   * 层级，默认：100
   */
  zIndex: number
  /*
   * 动画配置项
   */
  option: ribbonOption
  /*
   * 静态彩带是否显示，默认：false
   */
  ribbonShow: boolean
  /*
   * 滑动彩带,默认：true
   */
  ribbonAnimationShow: boolean
}
```
