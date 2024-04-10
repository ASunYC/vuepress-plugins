# vuepress-plugin-sakura

> vuepress plugin sakura for vuepress v2.x

## install

```
yarn add @asun01/vuepress-plugin-sakura
or
npm install @asun01/vuepress-plugin-sakura
```

## usage

1、Import dependent packages into the configuration file config ts

```
import { sakura } from '@asun01/vuepress-plugin-sakura'
```

2、Refer to vuepress 2 X Official Website configuration plug-in

```ts
plugins: [
    sakura({
      sakura_img：'/blog-docs/snowflake/blue.png''
    })
  ]
```

3、Configuration parameter type declaration

```ts
export interface sakuraOption {
  // 默认数量，默认：20
  sakura_num?: number
  // 图片地址，亦可为外部连接，默认：插件内置桃花图片
  sakura_img?: string
  //是否显示，默认：true
  sakura_show?: boolean
  //层叠z-index值,默认：100
  sakura_zindex?: number
}
```
