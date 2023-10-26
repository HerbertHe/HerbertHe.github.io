<template>
  <footer>
    Copyright &copy; 2018-{{ date }} <a href="https://github.com/HerbertHe" target="_blank" title="作者">Herbert He</a> All
    Rights Reserved! | Powered by Vitepress with Theme
    <a href="https://github.com/clark-cui/vitepress-blog-zaun" target="_blank" title="作者">vitepress-blog-zaun</a>
  </footer>
</template>
<script lang="ts" setup>
const date = new Date().getFullYear();
</script>
<style scoped>
footer {
  text-align: center;
  position: absolute;
  width: 100%;
  bottom: 20px;
  padding: 0 20px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text);
}

a {
  color: var(--vp-c-brand);
  font-weight: bold;
}

a:hover {
  text-decoration: none;
  color: var(--vp-c-hover);
}
</style>
