<template>
  <div class="reco-bgm-panel">
    <!-- 播放器 -->
    <audio id="bgm" :src="player.audio[player.curIndex].url" ref="bgm" @ended="bgmEnded" @canplay="playReady" @timeupdate="timeUpdate"></audio>
    <module-transition :position="player.floatPosition">
      <div v-show="player.isFloat" @click="changeBgmInfo(false)" class="reco-float-box" :style="player.floatStyle">
        <img :src="player.audio[player.curIndex].cover" />
      </div>
    </module-transition>
    <module-transition>
      <div class="reco-bgm-box" v-show="!player.isFloat" :style="player.panelPosition">
        <!-- 封面 -->
        <div class="reco-bgm-cover" @click="changeBgmInfo(false)" :style="`background-image:url(${player.audio[player.curIndex].cover})`">
          <!-- mini操作栏 -->
          <div v-show="player.isMini" class="mini-operation">
            <i v-show="player.curPlayStatus === 'playing' && player.isMini" @click.stop="pauseBgm" class="reco-bgm reco-bgm-pause"></i>
            <i v-show="player.curPlayStatus === 'paused' && player.isMini" @click.stop="playBgm" class="reco-bgm reco-bgm-play"></i>
          </div>
          <!-- 错误信息显示 -->
          <div v-show="player.isFault" class="falut-message">播放失败</div>
        </div>
        <module-transition duration=".15">
          <!-- 歌曲信息栏 -->
          <div v-show="!player.isMini" class="reco-bgm-info">
            <!-- 歌曲名 -->
            <div class="info-box"><i class="reco-bgm reco-bgm-music music"></i>{{ player.audio[player.curIndex].name }}</div>
            <!-- 艺术家名 -->
            <div class="info-box"><i class="reco-bgm reco-bgm-artist"></i>{{ player.audio[player.curIndex].artist }}</div>
            <!-- 歌曲进度条 -->
            <div class="reco-bgm-progress">
              <div class="progress-bar" @click="progressJump">
                <div class="bar" ref="pbar"></div>
              </div>
            </div>
            <!-- 歌曲操作栏 -->
            <div class="reco-bgm-operation">
              <i class="reco-bgm reco-bgm-last last" @click="playLast"></i>
              <i v-show="player.curPlayStatus === 'playing'" @click="pauseBgm" class="reco-bgm reco-bgm-pause pause"></i>
              <i v-show="player.curPlayStatus === 'paused'" ref="play" @click="playBgm" class="reco-bgm reco-bgm-play play"></i>
              <i class="reco-bgm reco-bgm-next next" @click="playNext"></i>
              <i v-show="!player.isMute" @click="muteBgm" class="reco-bgm reco-bgm-volume1 volume"></i>
              <i v-show="player.isMute" @click="unMuteBgm" class="reco-bgm reco-bgm-mute mute"></i>
              <div class="volume-bar" @click="volumeJump">
                <div class="bar" ref="vbar"></div>
              </div>
            </div>
          </div>
        </module-transition>
        <!-- 缩放按钮 -->
        <module-transition duration=".15">
          <div v-show="!player.isMini" @click="changeBgmInfo(true)" class="reco-bgm-left-box">
            <i class="reco-bgm reco-bgm-left"></i>
          </div>
        </module-transition>
      </div>
    </module-transition>
  </div>
</template>
<script setup lang="ts">
  import ModuleTransition from './ModuleTransition.vue'
  import { ref, onMounted, Ref } from 'vue'
  import { player, sessionItem, useBgmMusic } from './bgmMusicPlay'
  //播放器Audio Dom对象
  const bgm = ref(null) as Ref
  //音量vbar Dom对象
  const vbar = ref(null) as Ref
  //下一首
  const pbar = ref(null) as Ref
  useBgmMusic()
  onMounted(() => {
    if (player.floatPosition === 'left') {
      player.floatStyle = {
        ...player.floatStyle,
        left: '0',
        'border-top-right-radius': '20px',
        'border-bottom-right-radius': '20px'
      }
    } else {
      player.floatStyle = {
        ...player.floatStyle,
        right: '0',
        'border-top-left-radius': '20px',
        'border-bottom-left-radius': '20px'
      }
    }
    //autoShrink为true时隐藏歌曲信息
    if (player.autoShrink) {
      changeBgmInfo(true)
    }
  })
  // 显示或隐藏歌曲信息
  const changeBgmInfo = (flag: boolean) => {
    const isMobile = !!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    if (isMobile || player.shrinkMode === 'float') {
      player.isFloat = flag
    } else if (!isMobile && player.shrinkMode === 'mini') {
      player.isMini = flag
    }
  }
  //
  const playReady = () => {
    // 第一次加载时初始化音量条并处理自动播放事件
    if (player.firstLoad) {
      if (sessionItem.getVolume()) {
        const percent = sessionItem.getVolume()
        vbar.value.style.width = Number(percent) * 100 + '%'
        bgm.value.volume = percent
      } else {
        const vbar_width = bgm.value.volume * 100 + '%'
        vbar.value.style.width = vbar_width
      }
      player.firstLoad = false
      // 自动播放的处理
      if (player.autoplay) {
        const playPromise = bgm.value.play()
        if (playPromise !== undefined) {
          playPromise
            .then((res) => {
              player.curPlayStatus = 'playing'
            })
            .catch((err) => {
              // DOMException: play() failed because the user didn‘t interact with the document first
              // 监听用户点击事件实现自动播放
              window.addEventListener('click', pageClickHandle)
            })
        }
      }
    }
    // 播放状态下歌曲准备完成立即播放
    if (player.curPlayStatus === 'playing') {
      playBgm()
    }
  }
  const pageClickHandle = () => {
    // 自动播放的处理
    if (player.autoplay) {
      playBgm()
    }
    window.removeEventListener('click', pageClickHandle)
  }
  // 暂停
  const pauseBgm = () => {
    bgm.value.pause()
    player.curPlayStatus = 'paused'
  }
  // 播放
  const playBgm = () => {
    const playPromise = bgm.value.play()
    if (playPromise !== undefined) {
      playPromise
        .then((res) => {
          if (player.isFault) {
            player.isFault = false
          }
        })
        .catch((err) => {
          console.log(err)
          // 播放异常时显示播放失败并暂停播放
          player.isFault = true
          pauseBgm()
        })
    }
    player.curPlayStatus = 'playing'
  }
  // 播放下一首
  const playNext = () => {
    pbar.value.style.width = 0
    player.isFault = false
    if (player.curIndex >= player.audio.length - 1) {
      player.curIndex = 0
    } else {
      player.curIndex++
    }
  }
  // 播放上一首
  const playLast = () => {
    pbar.value.style.width = 0
    player.isFault = false
    if (player.curIndex <= 0) {
      player.curIndex = player.audio.length - 1
    } else {
      player.curIndex--
    }
  }
  // bgm结束时自动下一首
  const bgmEnded = () => {
    pbar.value.style.width = 0
    playNext()
  }
  // 更新歌曲进度条
  const timeUpdate = () => {
    const total_time = bgm.value.duration
    const cur_time = bgm.value.currentTime
    const bar_width = (cur_time / total_time) * 100 + '%'
    pbar.value.style.width = bar_width
  }
  // 点击进度条跳播
  const progressJump = (e) => {
    const total_time = bgm.value.duration
    const percent = e.offsetX / 150
    // 歌曲未加载完成时点击进度条的错误处理
    if (isNaN(total_time)) return
    bgm.value.currentTime = percent * total_time
  }
  // 点击音量条修改音量
  const volumeJump = (e) => {
    const percent = e.offsetX / 57
    if (percent >= 0 && percent <= 1) {
      player.isMute = !(percent > 0)
      vbar.value.style.width = percent * 100 + '%'
      bgm.value.volume = percent
      sessionItem.setVolume(bgm.value.volume)
    }
  }
  // 静音
  const muteBgm = () => {
    player.isMute = true
    sessionItem.setVolume(bgm.value.volume)
    vbar.value.style.width = 0
    bgm.value.volume = 0
  }
  // 取消静音
  const unMuteBgm = () => {
    player.isMute = false
    if (sessionItem.getVolume()) {
      const percent = sessionItem.getVolume()
      vbar.value.style.width = Number(percent) * 100 + '%'
      bgm.value.volume = percent
    } else {
      vbar.value.style.width = '100%'
      bgm.value.volume = 1
    }
  }
</script>
<style lang="css" scoped>
  @import '../assets/iconfont/iconfont.css';
  .reco-bgm-panel {
    height: 0;
    width: 0;
  }
  .reco-bgm-panel .reco-bgm-box {
    position: fixed;
    display: flex;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 50px;
    padding: 10px;
    box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.2);
  }
  .reco-bgm-panel .reco-bgm-box .reco-bgm-cover {
    background-size: contain;
    z-index: 3;
    float: left;
    height: 80px;
    width: 80px;
    border-radius: 40px;
    box-shadow: 0 0 10px 1px #616161;
  }
  .reco-bgm-panel .reco-bgm-box .reco-bgm-cover .mini-operation {
    height: 80px;
    border-radius: 40px;
    width: 80px;
    display: flex;
    background-color: rgba(158, 158, 158, 0.3);
    justify-content: center;
    align-items: center;
  }
  .reco-bgm-panel .reco-bgm-box .reco-bgm-cover .mini-operation i {
    color: #fff;
    cursor: pointer;
    font-size: 20px;
  }
  .reco-bgm-panel .reco-bgm-box .reco-bgm-cover .falut-message {
    height: 80px;
    border-radius: 40px;
    width: 80px;
    display: flex;
    background-color: rgba(158, 158, 158, 0.3);
    justify-content: center;
    align-items: center;
    color: #fff;
  }
  .reco-bgm-panel .reco-bgm-box .reco-bgm-info {
    float: left;
    z-index: 2;
    height: 80px;
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #3eaf7c !important;
  }
  .reco-bgm-panel .reco-bgm-box .reco-bgm-info .info-box {
    height: 21px;
    display: flex;
    align-items: center;
  }
  .reco-bgm-panel .reco-bgm-box .reco-bgm-info .info-box i {
    color: v-bind('player.color');
    font-size: 21px;
  }
  .reco-bgm-panel .reco-bgm-box .reco-bgm-info .info-box .music {
    font-size: 18px;
  }
  .reco-bgm-panel .reco-bgm-box .reco-bgm-info .reco-bgm-progress {
    height: 14px;
    width: 150px;
    display: flex;
    align-items: center;
  }
  .reco-bgm-panel .reco-bgm-box .reco-bgm-info .reco-bgm-progress .progress-bar {
    height: 5px;
    width: 150px;
    background: #757575;
    border-radius: 5px;
    position: relative;
    cursor: pointer;
  }
  .reco-bgm-panel .reco-bgm-box .reco-bgm-info .reco-bgm-progress .progress-bar .bar {
    position: absolute;
    left: 0;
    top: 0;
    height: 5px;
    width: 0;
    background-color: v-bind('player.color');
    border-radius: 5px;
  }
  .reco-bgm-panel .reco-bgm-box .reco-bgm-info .reco-bgm-operation {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 24px;
  }
  .reco-bgm-panel .reco-bgm-box .reco-bgm-info .reco-bgm-operation i {
    margin-right: 5px;
    color: v-bind('player.color');
    cursor: pointer;
  }
  .reco-bgm-panel .reco-bgm-box .reco-bgm-info .reco-bgm-operation .last {
    font-size: 14px;
  }
  .reco-bgm-panel .reco-bgm-box .reco-bgm-info .reco-bgm-operation .next {
    font-size: 14px;
  }
  .reco-bgm-panel .reco-bgm-box .reco-bgm-info .reco-bgm-operation .pause {
    font-size: 15px;
  }
  .reco-bgm-panel .reco-bgm-box .reco-bgm-info .reco-bgm-operation .play {
    font-size: 15px;
  }
  .reco-bgm-panel .reco-bgm-box .reco-bgm-info .reco-bgm-operation .volume {
    font-size: 18px;
  }
  .reco-bgm-panel .reco-bgm-box .reco-bgm-info .reco-bgm-operation .mute {
    font-size: 18px;
  }
  .reco-bgm-panel .reco-bgm-box .reco-bgm-info .reco-bgm-operation .volume-bar {
    height: 5px;
    width: 57px;
    background: #757575;
    border-radius: 5px;
    position: relative;
    cursor: pointer;
  }
  .reco-bgm-panel .reco-bgm-box .reco-bgm-info .reco-bgm-operation .volume-bar .bar {
    position: absolute;
    left: 0;
    top: 0;
    height: 5px;
    width: 0;
    background-color: v-bind('player.color');
    border-radius: 5px;
  }
  .reco-bgm-panel .reco-bgm-box .reco-bgm-left-box {
    float: left;
    height: 80px;
    font-size: 22px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;
  }
  .reco-bgm-panel .reco-bgm-box .reco-bgm-left-box i {
    color: v-bind('player.color');
  }
  .reco-bgm-panel .reco-float-box {
    width: 40px;
    height: 40px;
    background-color: v-bind('player.color');
    position: fixed;
    bottom: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-shadow: var(--box-shadow);
  }
  .reco-bgm-panel .reco-float-box img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
</style>
