# vuepress-plugin-kan-ban-niang

> vuepress plugin dynamic-title for vuepress v2.x

## install

```
yarn add @asun01/vuepress-plugin-kan-ban-niang
or
npm install @asun01/vuepress-plugin-kan-ban-niang
```

## usage

1、Import dependent packages into the configuration file config ts

```
import { kanBanNiang } from '@asun01/vuepress-plugin-kan-ban-niang'
```

2、Refer to vuepress 2 X Official Website configuration plug-in

```ts
plugins: [kanBanNiang()]
```

3、Configuration parameter type declaration

```ts
export interface messagesObject {
  /*
   * 欢迎展示文本,默认：'欢迎来到我的博客'
   */
  welcome: string
  /*
   * 回到博客首页展示文本,默认：'心里的花，我想要带你回家。'
   */
  home: string
  /*
   * 更换主题模型是展示文本,默认：'好吧，希望你能喜欢我的其他小伙伴。'
   */
  theme: string
  /*
   * 关闭看板娘时展示文本,默认：'你知道我喜欢吃什么吗？痴痴地望着你。'
   */
  close: string
  /*
   * 跳转插件github展示文本,默认：'想知道关于我的更多信息吗？'
   */
  info: string
}
export interface kanbanOption {
  /*
   * 是否开启clean模式(隐藏所有按钮),默认：false
   */
  clean: boolean
  /*
   * 默认模型主题,默认：['blackCat', 'whiteCat', 'haru1', 'haru2', 'haruto', 'koharu', 'izumi', 'shizuku', 'wanko', 'miku', 'z16']
   */
  theme: Array<string>
  /*
   * 按钮提示语
   */
  messages: messagesObject
  /*
   * 自定义消息框样式，默认：{ right: '68px', bottom: '290px'}
   */
  messageStyle: object
  /*
   * 自定义模型样式，默认：{ right: '90px', bottom: '-20px',opacity: '0.9'}
   */
  modelStyle: object
  /*
   * 自定义按钮样式,{ right: '90px', bottom: '40px'}
   */
  btnStyle: object
  /*
   * 模型宽度,默认：250
   */
  width: number
  /*
   * 模型高度,默认：320
   */
  height: number
}
```
