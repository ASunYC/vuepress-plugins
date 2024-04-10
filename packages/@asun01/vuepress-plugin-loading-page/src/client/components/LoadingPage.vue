<template>
  <div id="loader-wrapper">
    <h3 class="title">{{ siteData.title || frontmatter.title }}</h3>
    <p class="description">{{ siteData.description || frontmatter.description }}</p>
    <client-only>
      <component :is="mode" :key="mode"></component>
    </client-only>
  </div>
</template>
<script setup lang="ts">
  import RotateLoading from './RotateLoading.vue'
  import BoxLoading from './BoxLoading.vue'
  import CircleLoading from './CircleLoading.vue'
  import PointLoading from './PointLoading.vue'
  import LineLoading from './LineLoading.vue'
  import DefaultLoading from './DefaultLoading.vue'
  import { computed } from 'vue'
  import { usePageFrontmatter, useSiteData } from '@vuepress/client'
  const frontmatter = usePageFrontmatter()
  const siteData = useSiteData()
  const componentObj = [RotateLoading, BoxLoading, CircleLoading, LineLoading, PointLoading, DefaultLoading]
  const mode = computed(() => {
    if (RANDOM) {
      return componentObj[Math.floor(Math.random() * 5)]
    } else {
      return componentObj.find((item) => item.__name === MODE)
    }
  })
</script>
<style lang="css" scoped>
  #loader-wrapper {
    height: 100vh;
    width: 100vw;
    background: #fff;
    position: absolute;
    z-index: 1000000;
  }
  #loader-wrapper .title {
    margin: 8rem auto 2rem;
    text-align: center;
    color: #008000;
    color: var(--text-color);
    font-size: 30px;
    box-sizing: border-box;
    padding: 0 10px;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }
  #loader-wrapper .description {
    margin: auto;
    text-align: center;
    color: #008000;
    color: var(--text-color);
    font-size: 22px;
    box-sizing: border-box;
    padding: 0 10px;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }
</style>
