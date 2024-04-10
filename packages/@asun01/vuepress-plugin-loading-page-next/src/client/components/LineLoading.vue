<template>
  <div class="load-container">
    <div class="container">
      <div class="boxLoading boxLoading1"></div>
      <div class="boxLoading boxLoading2"></div>
      <div class="boxLoading boxLoading3"></div>
      <div class="boxLoading boxLoading4"></div>
      <div class="boxLoading boxLoading5"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  const color = ref(COLOR || '#3eaf7c')
</script>

<style scoped lang="scss">
  .load-container {
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 100px auto;
    .container {
      height: 60px;
      text-align: center;
      font-size: 10px;
      .boxLoading {
        background-color: v-bind(color);
        height: 100%;
        width: 3px;
        display: inline-block;
        margin: 0px 5px;
        -webkit-animation: stretchdelay 1.2s infinite ease-in-out;
        animation: stretchdelay 1.2s infinite ease-in-out;
      }
      .boxLoading2 {
        -webkit-animation-delay: -1.1s;
        animation-delay: -1.1s;
      }
      .boxLoading3 {
        -webkit-animation-delay: -1s;
        animation-delay: -1s;
      }
      .boxLoading4 {
        -webkit-animation-delay: -0.9s;
        animation-delay: -0.9s;
      }
      .boxLoading5 {
        -webkit-animation-delay: -0.8s;
        animation-delay: -0.8s;
      }
    }
  }

  @-webkit-keyframes stretchdelay {
    0%,
    40%,
    100% {
      -webkit-transform: scaleY(0.4);
    }
    20% {
      -webkit-transform: scaleY(1);
    }
  }
  @keyframes stretchdelay {
    0%,
    40%,
    100% {
      transform: scaleY(0.4);
      -webkit-transform: scaleY(0.4);
    }
    20% {
      transform: scaleY(1);
      -webkit-transform: scaleY(1);
    }
  }
</style>
