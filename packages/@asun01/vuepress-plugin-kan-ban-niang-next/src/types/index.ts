export interface messagesObject {
  /*
   * 欢迎展示文本
   */
  welcome: string
  /*
   * 回到博客首页展示文本
   */
  home: string
  /*
   * 更换主题模型是展示文本
   */
  theme: string
  /*
   * 关闭看板娘时展示文本
  */
  close: string
  /*
   * 跳转插件github展示文本
   */
  info: string
}
export interface kanbanOption {
  /*
   * 是否开启clean模式(隐藏所有按钮)
   */
  clean: boolean
  /*
   * 默认模型主题
   */
  theme: Array<string>
  /*
   * 按钮提示语
   */
  messages: messagesObject
  /*
   * 自定义消息框样式
   */
  messageStyle: object
  /*
   * 自定义模型样式
   */
  modelStyle: object
  /*
   * 自定义按钮样式
   */
  btnStyle: object
  /*
   * 模型宽度
   */
  width: number
  /*
   * 模型高度
   */
  height: number
}
