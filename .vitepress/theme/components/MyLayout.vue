<template>
  <Layout>
    <template #doc-before>
      <Title />
      <Category />
    </template>
    <template #doc-after>
      <div>
        <button @click="back">cd ··</button>
      </div>
      <Comments />
    </template>
    <!-- Home slot-->
    <template #home-hero-before>
      <HomeHero />
    </template>
    <template #home-features-after>
      <Page />
    </template>
  </Layout>
  <!-- copyright -->
  <CopyRight />
</template>
<script lang="ts" setup>
import DefaultTheme from "vitepress/theme";
import { onMounted } from "vue"
import HomeHero from "./HomeHero.vue";
import CopyRight from "./CopyRight.vue";
import Comments from "./Comments.vue";
import Page from "./Page.vue";
import Category from "./Category.vue";
import Title from "./Title.vue";
const { Layout } = DefaultTheme;
const back = () => {
  history.back();
};

// 触发刷新
onMounted(() => {
  const htmlDom = document.querySelector("html")!
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === "class") {
        location.reload()
      }
    })
  })

  observer.observe(htmlDom, { attributes: true })
})
</script>
<style scoped>
button {
  display: inline-block;
  position: relative;
  color: var(--vp-c-color-d);
  cursor: pointer;
  font-size: 1.2em;
  font-weight: bold;
}

button::after {
  content: "";
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: var(--vp-c-color-d);
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}

button:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
</style>
