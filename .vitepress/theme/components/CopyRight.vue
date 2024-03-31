<template>
  <footer>
    <div>
      <p xmlns:cc="http://creativecommons.org/ns#" class="cc-license"><a rel="cc:attributionURL"
          href="https://ibert.me">The website
          content</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName"
          href="https://ibert.me">Herbert He</a> is
        licensed under <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1" target="_blank"
          rel="license noopener noreferrer" style="display:inline-flex;">CC BY-NC-SA 4.0<img
            style="height:22px!important;margin-left:3px;vertical-align:text-bottom;"
            src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img
            style="height:22px!important;margin-left:3px;vertical-align:text-bottom;"
            src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"><img
            style="height:22px!important;margin-left:3px;vertical-align:text-bottom;"
            src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1"><img
            style="height:22px!important;margin-left:3px;vertical-align:text-bottom;"
            src="https://mirrors.creativecommons.org/presskit/icons/sa.svg?ref=chooser-v1"></a></p>
    </div>
    <div>
      Copyright &copy; 2018-{{ date }} <a href="https://github.com/HerbertHe" target="_blank" title="作者">Herbert He</a>
      All
      Rights Reserved! | Powered by Vitepress with Theme developed with
      <a href="https://github.com/clark-cui/vitepress-blog-zaun" target="_blank" title="主题">vitepress-blog-zaun</a>
    </div>
  </footer>
</template>
<script lang="ts" setup>
const date = new Date().getFullYear();
</script>
<style scoped>
footer {
  text-align: center;
  width: 100%;
  padding: 30px 20px;
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
