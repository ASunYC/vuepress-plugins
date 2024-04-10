# vuepress-plugin-cursor-effects

> vuepress plugin dynamic-title for vuepress v2.x

## install

```
yarn add @asun01/vuepress-plugin-cursor-effects
or
npm install @asun01/vuepress-plugin-cursor-effects
```

## usage

1、Import dependent packages into the configuration file config ts

```
import { dynamicTitle } from '@asun01/vuepress-plugin-cursor-effects'
```

2、Refer to vuepress 2 X Official Website configuration plug-in

```ts
plugins: [
  dynamicTitle()
]
```

3、Configuration parameter type declaration

```ts
export interface dynamicOption {
  /*
   * 显示时图标,默认：/favicon.ico
   */
  showIcon?: string
  /*
   * 显示时文本,默认：'(/≧▽≦/)咦！又好了！'
   */
  showText?: string
  /*
   * 隐藏时图标,默认：/favicon.ico
   */
  hideIcon?: string
  /*
   * 隐藏时文本,默认：'(●—●)喔哟，崩溃啦！'
   */
  hideText?: string
  /*
   * 恢复时间(毫秒)，默认：2000
   */
  recoverTime?: number
}
```
