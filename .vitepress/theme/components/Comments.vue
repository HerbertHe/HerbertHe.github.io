<template>
  <div id="gitalk-container"></div>
</template>
<script lang="ts" setup>
import "gitalk/dist/gitalk.css";
import Gitalk from "gitalk";
import { onContentUpdated, useRouter } from "vitepress";

// const { route, go } = useRouter();
function deleteChild() {
  const element = document.querySelector("#gitalk-container");
  let child = element?.lastElementChild;
  while (child) {
    element?.removeChild(child);
    child = element?.lastElementChild;
  }
}
onContentUpdated(() => {
  // reset gittalk element for update
  deleteChild();
  const gitalk = new Gitalk({
    clientID: "fc6169aee8aca4748b46",
    clientSecret: "8f0019b48501a32684d5ca6a9d47618601bf0cef",
    repo: "blog-gitalk",
    owner: "HerbertHe",
    admin: ["HerbertHe"],
    id: location.pathname.substring(0, 50), // Ensure uniqueness and length less than 50
    language: "zh-CN",
    distractionFreeMode: true, // Facebook-like distraction free mode
  });
  gitalk.render("gitalk-container");
});
</script>
<style scoped></style>
