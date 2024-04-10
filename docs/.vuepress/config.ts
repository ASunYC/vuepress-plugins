
import { defineUserConfig, defaultTheme } from "vuepress";
import { viteBundler } from "@vuepress/bundler-vite";
import { bgmMusicPlayer } from '../../packages/@asun01/vuepress-plugin-bgm-player-next'
import { loadingPage } from '../../packages/@asun01/vuepress-plugin-loading-page'
export default defineUserConfig({
  //站点根路径,默认配置/
  base: "/",
  //站点语言配置
  lang: "zh-CN",
  title: "小紫念沁",
  description: "资料文档汇集网站",
  dest: "dist",
  head: [
    ["link", { rel: "shortcut icon", type: "image/x-icon", href: "/favicon.ico" }],
    ["meta", { name: "viewport", content: "width=device-width,initial-scale=1,user-scalable=no" }]
  ],
  theme: defaultTheme({
    logo: "https://52.ifelse.top/chfs/shared/ASun/blog-images/202208241822713.png"
  }),
  markdown: {
    headers: {
      level: [1, 2, 3, 4],
    },
  },
  //指定开发服务器的主机名
  host: "0.0.0.0",
  //端口
  port: 9527,
  bundler: viteBundler({
    viteOptions: {
      //打包配置
      build: {
        //配置超过1000kb经过提醒
        chunkSizeWarningLimit: 2000,
        //如果设置为false，整个项目中的所有 CSS 将被提取到一个 CSS 文件中
        cssCodeSplit: true,
        rollupOptions: {
          output: {
            //处理gh-pages因hash打包存在旧文件问题。
            chunkFileNames: 'assets/js/[name].js',
            entryFileNames: 'assets/js/[name].js',
            inlineDynamicImports: false,
            manualChunks(id) {
              //vicons额外打包
              if (id.includes('@vicons')) {
                return "vicons";
              }
              //asun01插件额外打包
              if (id.includes('@asun01')) {
                return "asun01";
              }
              //pagesRoutes 额外打包
              if (id.endsWith('pagesRoutes.js')) {
                return "pagesRoutes"
              }
            }
          }
        }
      }
    }
  }),
  //注册插件
  plugins: [
    //音乐播放器插件。
    bgmMusicPlayer({
      audios: [
        {
          name: '卡农',
          artist: '卡农钢琴版',
          url: '/music/canon/canon.mp3',
          cover: '/music/canon/canon.jpg'
        },
        {
          name: '风居住的街道',
          artist: '风居住的街道 钢琴版 - 钢琴曲',
          url: '/music/wind/wind.mp3',
          cover: '/music/wind/wind.jpg'
        },
        {
          name: '夜的钢琴曲',
          artist: '夜的钢琴曲五 - 石进',
          url: '/music/night/night.mp3',
          cover: '/music/night/night.jpg'
        }
      ],
      autoShrink: true,
      floatStyle: { bottom: '100px', 'z-index': '999999' },
    }) as any,
    loadingPage()
  ]
});
