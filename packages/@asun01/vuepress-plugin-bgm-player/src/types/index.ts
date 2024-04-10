
export interface AudioOption {
  //音乐名称
  name: string
  //艺术家名称
  artist: string
  //音乐路径
  url: string
  //封面图片
  cover: string
}
export interface BgmMusicPlayerOptions {
  //播放器位置
  position?: any
  //播放器音乐
  audios: Array<AudioOption>
  //自动播放
  autoplay?: boolean
  //是否默认收缩
  autoShrink?: boolean
  //伸缩模式('mini'/'float')
  shrinkMode?: string
  //悬浮位置
  floatPosition?: string
  //悬浮样式
  floatStyle?: any
  //播放器主题颜色
  color?: string
}
