<template>
  <div class="loader-main">
    <div v-for="item in 4" :key="`out${item}`"></div>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  const color = ref(COLOR || '#3eaf7c')
</script>
<style lang="css" scoped>
  .loader-main {
    width: 120px;
    height: 50px;
    top: 45%;
    left: 50%;
    z-index: 555;
    transform: translate(-50%, 0);
    margin: 0px auto;
  }
  .loader-main div:nth-child(2) {
    animation: pacman-balls 1s 0s infinite linear;
  }
  .loader-main div:nth-child(3) {
    animation: pacman-balls 1s 0.33s infinite linear;
  }
  .loader-main div:nth-child(4) {
    animation: pacman-balls 1s 0.66s infinite linear;
  }
  .loader-main div:nth-child(5) {
    animation: pacman-balls 1s 0.99s infinite linear;
  }
  .loader-main div:first-of-type {
    width: 0px;
    height: 0px;
    border-right: 25px solid transparent;
    border-top: 25px solid v-bind(color);
    border-left: 25px solid v-bind(color);
    border-bottom: 25px solid v-bind(color);
    border-radius: 25px;
    animation: rotate_pacman_half_up 0.5s 0s infinite;
  }
  .loader-main div:nth-child(2) {
    width: 0px;
    height: 0px;
    border-right: 25px solid transparent;
    border-top: 25px solid v-bind(color);
    border-left: 25px solid v-bind(color);
    border-bottom: 25px solid v-bind(color);
    border-radius: 25px;
    animation: rotate_pacman_half_down 0.5s 0s infinite;
    margin-top: -50px;
  }
  .loader-main div:nth-child(3),
  .loader-main div:nth-child(4),
  .loader-main div:nth-child(5),
  .loader-main div:nth-child(6) {
    background-color: v-bind(color);
    width: 15px;
    height: 15px;
    border-radius: 100%;
    margin: 2px;
    width: 10px;
    height: 10px;
    position: absolute;
    transform: translate(0, -6.25px);
    top: 25px;
    left: 100px;
  }
  @-moz-keyframes pacman-balls {
    75% {
      opacity: 0.7;
    }
    100% {
      -webkit-transform: translate(-100px, -6.25px);
      transform: translate(-100px, -6.25px);
    }
  }
  @-webkit-keyframes pacman-balls {
    75% {
      opacity: 0.7;
    }
    100% {
      -webkit-transform: translate(-100px, -6.25px);
      transform: translate(-100px, -6.25px);
    }
  }
  @-o-keyframes pacman-balls {
    75% {
      opacity: 0.7;
    }
    100% {
      -webkit-transform: translate(-100px, -6.25px);
      transform: translate(-100px, -6.25px);
    }
  }
  @keyframes pacman-balls {
    75% {
      opacity: 0.7;
    }
    100% {
      -webkit-transform: translate(-100px, -6.25px);
      transform: translate(-100px, -6.25px);
    }
  }
  @-moz-keyframes rotate_pacman_half_up {
    0% {
      -webkit-transform: rotate(270deg);
      transform: rotate(270deg);
    }
    50% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
    100% {
      -webkit-transform: rotate(270deg);
      transform: rotate(270deg);
    }
  }
  @-webkit-keyframes rotate_pacman_half_up {
    0% {
      -webkit-transform: rotate(270deg);
      transform: rotate(270deg);
    }
    50% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
    100% {
      -webkit-transform: rotate(270deg);
      transform: rotate(270deg);
    }
  }
  @-o-keyframes rotate_pacman_half_up {
    0% {
      -webkit-transform: rotate(270deg);
      transform: rotate(270deg);
    }
    50% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
    100% {
      -webkit-transform: rotate(270deg);
      transform: rotate(270deg);
    }
  }
  @keyframes rotate_pacman_half_up {
    0% {
      -webkit-transform: rotate(270deg);
      transform: rotate(270deg);
    }
    50% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
    100% {
      -webkit-transform: rotate(270deg);
      transform: rotate(270deg);
    }
  }
  @-moz-keyframes rotate_pacman_half_down {
    0% {
      -webkit-transform: rotate(90deg);
      transform: rotate(90deg);
    }
    50% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(90deg);
      transform: rotate(90deg);
    }
  }
  @-webkit-keyframes rotate_pacman_half_down {
    0% {
      -webkit-transform: rotate(90deg);
      transform: rotate(90deg);
    }
    50% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(90deg);
      transform: rotate(90deg);
    }
  }
  @-o-keyframes rotate_pacman_half_down {
    0% {
      -webkit-transform: rotate(90deg);
      transform: rotate(90deg);
    }
    50% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(90deg);
      transform: rotate(90deg);
    }
  }
  @keyframes rotate_pacman_half_down {
    0% {
      -webkit-transform: rotate(90deg);
      transform: rotate(90deg);
    }
    50% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(90deg);
      transform: rotate(90deg);
    }
  }
</style>
