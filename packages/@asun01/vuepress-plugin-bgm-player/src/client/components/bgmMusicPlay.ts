import { reactive, ref, watch, onMounted } from 'vue'
import type { BgmMusicPlayerOptions } from '../../types/index'
declare const BGM_MUSIC_PLAYER: BgmMusicPlayerOptions
let InterVal: number
// 歌曲封面的旋转角度
const rotateVal = ref(0)
const volumeKey = ref('reco-bgm-volume')
const rotate = () => {
  InterVal = window.setInterval(() => {
    const cover = document.querySelector('.reco-bgm-cover') as HTMLElement
    const btn = document.querySelector('.mini-operation') as HTMLElement
    const fm = document.querySelector('.falut-message') as HTMLElement
    rotateVal.value += 1
    // 设置旋转属性(顺时针)
    cover.style.transform = 'rotate(' + rotateVal.value + 'deg)'
    // 设置旋转时的动画  匀速0.1s
    cover.style.transition = '0.1s linear'
    // 设置旋转属性(逆时针)
    btn.style.transform = 'rotate(-' + rotateVal.value + 'deg)'
    // 设置旋转时的动画  匀速0.1s
    btn.style.transition = '0.1s linear'
    // 设置旋转属性(逆时针)
    fm.style.transform = 'rotate(-' + rotateVal.value + 'deg)'
    // 设置旋转时的动画  匀速0.1s
    fm.style.transition = '0.1s linear'
  }, 100)
}
//存储当前播放进度
export const sessionItem = {
  setVolume(val: string) {
    sessionStorage.setItem(volumeKey.value, val)
  },
  getVolume(): string {
    return sessionStorage.getItem(volumeKey.value) || '0.3'
  },
  removeVolume() {
    sessionStorage.removeItem(volumeKey.value)
  }
}
export const player = reactive({
  panelPosition: BGM_MUSIC_PLAYER.position!,
  curIndex: 0,
  curPlayStatus: 'paused',
  audio: BGM_MUSIC_PLAYER.audios,
  autoplay: BGM_MUSIC_PLAYER.autoplay,
  isFloat: false,
  isMini: false,
  firstLoad: true,
  isMute: false,
  isFault: false,
  floatPosition: BGM_MUSIC_PLAYER.floatPosition,
  floatStyle: BGM_MUSIC_PLAYER.floatStyle,
  autoShrink: BGM_MUSIC_PLAYER.autoShrink,
  shrinkMode: BGM_MUSIC_PLAYER.shrinkMode,
  color: BGM_MUSIC_PLAYER.color,
  backgroundColor: "#fff"
})

export const useBgmMusic = () => {
  onMounted(() => {
    // 监听播放开关(打开或关闭)
    watch(
      () => player.curPlayStatus,
      (newVal, oldVal) => {
        if (newVal === 'playing') {
          rotate()
        } else {
          window.clearInterval(InterVal)
        }
      }, { immediate: true })
  })
}
