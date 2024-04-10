export interface ribbonOption {
  /*
   * 色带HSL饱和度
   */
  colorSaturation: string
  /*
   * 色带HSL亮度量
   */
  colorBrightness: string
  /*
   * 带状颜色不透明度
   */
  colorAlpha: number
  /*
   * 在HSL颜色空间中循环显示颜色的速度有多快
   */
  colorCycleSpeed: number
  /*
   * 从哪一侧开始Y轴 (top|min, middle|center, bottom|max, random)
   */
  verticalPosition: string
  /*
   * 到达屏幕另一侧的速度有多快
   */
  horizontalSpeed: number
  /*
   * 在任何给定时间，屏幕上会保留多少条带
   */
  ribbonCount: number
  /*
   * 添加笔划以及色带填充颜色
   */
  strokeSize: number
  /*
   * 通过页面滚动上的因子垂直移动色带
   */
  parallaxAmount: number
  /*
   * 随着时间的推移，为每个功能区添加动画效果
   */
  animateSections: true
}

export interface ribbonDataOption {
  /*
   * 尺寸大小
   */
  size: number

  /*
   * 透明度
   */
  opacity: number
  /*
   * 层级
   */
  zIndex: number
  /*
   * 动画配置项
   */
  option: ribbonOption
  /*
   * 点击彩带true显示,false为不显示
   */
  ribbonShow: boolean
  /*
   * 滑动彩带
   */
  ribbonAnimationShow: boolean
}
