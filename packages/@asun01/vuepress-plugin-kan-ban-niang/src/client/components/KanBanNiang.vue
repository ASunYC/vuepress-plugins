<template>
  <div class="kanbanniang">
    <div class="banniang-container" v-show="isLoaded">
      <div class="messageBox" :style="messageStyle" v-show="isShowMessageBox">
        {{ messages.message || '欢迎来到 ' + $site.title }}
      </div>
      <div v-show="!isShowBtns" :style="btnStyle" class="operation" @mouseenter="isShowMessageBox = true" @mouseleave="isShowMessageBox = false">
        <i class="kbnfont kbn-ban-home ban-home" @click="goHome" @mouseenter="hoverGoHome" @mouseleave="resetMessage"></i>
        <i class="kbnfont kbn-ban-message message"></i>
        <i class="kbnfont kbn-ban-close close" @click="closeBanNiang" @mouseenter="hoverCloseBanNiang" @mouseleave="resetMessage"></i>
        <a target="_blank" href="https://gitee.com/ASun001/freeman.home.vuepress-plugins/tree/master/packages/@asun01">
          <i class="kbnfont kbn-ban-info info" @mouseenter="hoverMoreInfo" @mouseleave="resetMessage"></i>
        </a>
        <i v-show="myTheme.length > 1" class="kbnfont kbn-ban-theme skin" @click="changeTheme" @mouseenter="hoverChangeTheme" @mouseleave="resetMessage"></i>
      </div>
      <canvas id="banniang" :style="modelStyle" :width="style.width" :height="style.height" class="live2d"></canvas>
    </div>
    <div class="showBanNiang" v-show="displayBanNiang" @click="showBanNiang">看板娘</div>
  </div>
</template>

<script>
  import live2dJSString from '../assets/js/live2d'
  export default {
    name: 'KanBanNiang',
    data() {
      return {
        isLoaded: true,
        displayBanNiang: false,
        isShowMessageBox: false,
        isShowBtns: CLEAN,
        messages: {
          message: MESSAGES.welcome,
          welcome: MESSAGES.welcome,
          home: MESSAGES.home,
          theme: MESSAGES.theme,
          close: MESSAGES.close,
          info: MESSAGES.info
        },
        currentTheme: THEME[0],
        myTheme: THEME,
        themeName: ['blackCat', 'whiteCat', 'haru1', 'haru2', 'haruto', 'koharu', 'izumi', 'shizuku', 'wanko', 'miku', 'z16'],
        //模型地址
        model: {
          blackCat: 'https://52.ifelse.top/chfs/shared/ASun/blog-live2DModel/live2d-widget-model-hijiki/assets/hijiki.model.json',
          whiteCat: 'https://52.ifelse.top/chfs/shared/ASun/blog-live2DModel/live2d-widget-model-tororo/assets/tororo.model.json',
          haru1: 'https://52.ifelse.top/chfs/shared/ASun/blog-live2DModel/live2d-widget-model-haru/01/assets/haru01.model.json',
          haru2: 'https://52.ifelse.top/chfs/shared/ASun/blog-live2DModel/live2d-widget-model-haru/02/assets/haru02.model.json',
          haruto: 'https://52.ifelse.top/chfs/shared/ASun/blog-live2DModel/live2d-widget-model-haruto/assets/haruto.model.json',
          koharu: 'https://52.ifelse.top/chfs/shared/ASun/blog-live2DModel/live2d-widget-model-koharu/assets/koharu.model.json',
          izumi: 'https://52.ifelse.top/chfs/shared/ASun/blog-live2DModel/live2d-widget-model-izumi/assets/izumi.model.json',
          shizuku: 'https://52.ifelse.top/chfs/shared/ASun/blog-live2DModel/live2d-widget-model-shizuku/assets/shizuku.model.json',
          wanko: 'https://52.ifelse.top/chfs/shared/ASun/blog-live2DModel/live2d-widget-model-wanko/assets/wanko.model.json',
          miku: 'https://52.ifelse.top/chfs/shared/ASun/blog-live2DModel/live2d-widget-model-miku/assets/miku.model.json',
          z16: 'https://52.ifelse.top/chfs/shared/ASun/blog-live2DModel/live2d-widget-model-z16/assets/z16.model.json'
        },
        // model的高宽
        style: {
          width: WIDTH,
          height: HEIGHT
        },
        // model的样式
        modelStyle: MODEL_STYLE,
        // messageBox的样式
        messageStyle: MESSAGE_STYLE,
        // 按钮的样式
        btnStyle: BTN_STYLE
      }
    },
    mounted() {
      this.btnStyle = {
        ...this.btnStyle,
        height: this.myTheme.length > 1 ? '120px' : '100px'
      }
      // 初始化live2d模型
      this.initBanNiang()
    },
    methods: {
      hoverGoHome() {
        this.messages.message = this.messages.home
      },
      hoverChangeTheme() {
        this.messages.message = this.messages.theme
      },
      hoverMoreInfo() {
        this.messages.message = this.messages.info
      },
      hoverCloseBanNiang() {
        this.messages.message = this.messages.close
      },
      resetMessage() {
        this.messages.message = this.messages.welcome
      },
      goHome() {
        if (this.$route.path !== '/') {
          this.$router.push('/')
        }
      },
      changeTheme() {
        const themes = []
        for (var i = 0; i < this.myTheme.length; i++) {
          if (this.myTheme[i] != this.currentTheme) {
            themes.push(this.myTheme[i])
          }
        }
        const randomNum = Math.floor(Math.random() * (this.myTheme.length - 1))
        this.currentTheme = themes[randomNum]
        this.initBanNiang()
      },
      closeBanNiang() {
        this.isLoaded = false
        this.displayBanNiang = true
      },
      showBanNiang() {
        this.isLoaded = true
        this.displayBanNiang = false
        this.initBanNiang()
      },
      initBanNiang() {
        if (this.themeName.indexOf(this.currentTheme) === -1) {
          console.log('@vuepress-reco/vuepress-plugin-kan-ban-niang不支持主题' + this.currentTheme + ', 请检查主题名, 或前往https://vuepress-theme-reco.recoluan.com/views/plugins/kanbanniang.html 查看支持的主题')
          document.querySelector('.kanbanniang').style.display = 'none'
          return
        }
        const isMobile = !!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        if (isMobile) {
          this.isLoaded = false
          return console.log('mobile do not load model')
        }
        if (!window.loadlive2d) {
          const script = document.createElement('script')
          script.innerHTML = live2dJSString
          document.body.appendChild(script)
        }
        var ajax = new XMLHttpRequest()
        ajax.open('get', this.model[this.currentTheme])
        ajax.send()
        ajax.onreadystatechange = function () {
          if (ajax.status !== 200) {
            console.log('看板娘的CDN资源加载失败了，请稍后刷新页面重试！')
            document.querySelector('.kanbanniang').style.display = 'none'
          }
        }
        window.loadlive2d('banniang', this.model[this.currentTheme])
      }
    }
  }
</script>

<style lang="css" scoped>
  @import '../assets/iconfont/iconfont.css';
  .showBanNiang {
    position: fixed;
    right: 70px;
    bottom: 6rem;
    color: #3eaf7c;
    width: 48px;
    height: 20px;
    padding: 10px;
    cursor: pointer;
    border-radius: 4px;
    background-color: rgba(231, 234, 241, 0.5);
    box-shadow: var(--box-shadow);
    background-color: var(--background-color);
  }
  .banniang-container {
    position: fixed;
    right: 50px;
    bottom: 100px;
    color: #00adb5;
  }
  .banniang-container .messageBox {
    position: fixed;
    padding: 10px;
    width: 180px;
    border-radius: 8px;
    background-color: #3eaf7c;
    color: #fff;
    opacity: 0.8;
  }
  .banniang-container .operation {
    width: 20px;
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .banniang-container .operation i {
    font-size: 20px;
    cursor: pointer;
    color: #3eaf7c;
  }
  .banniang-container .operation i:hover {
    color: #ff8080;
  }
  .banniang-container #banniang {
    z-index: 99999;
    pointer-events: none;
    position: fixed;
  }
</style>
