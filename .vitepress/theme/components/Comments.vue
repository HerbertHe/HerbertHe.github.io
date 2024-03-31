<template>
  <Giscus id="giscus-comments" repo="HerbertHe/HerbertHe.github.io" repoId="MDEwOlJlcG9zaXRvcnkxNDA0NDYyNzA="
    category="Ideas" categoryId="DIC_kwDOCF8KPs4CeWqE" mapping="pathname" strict="0" lang="en" loading="lazy"
    inputPosition="top" :theme=theme crossorigin="anonymous" reactionsEnabled="1" />
</template>
<script lang="ts" setup>
import { ref } from "vue"
import { onContentUpdated } from "vitepress"
import Giscus from "@giscus/vue"

const theme = ref("noborder_light")
onContentUpdated(() => {
  if (document.querySelector("html")?.classList.contains("dark")) {
    theme.value = "dark_dimmed"
  } else {
    theme.value = "noborder_light"
  }
})
</script>
