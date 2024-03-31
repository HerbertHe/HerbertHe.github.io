<template>
  <Teleport :to="domRef">
    <div class="container">
      <div class="category" v-if="headers.length > 0">
        <ul class="list">
          <li class="header" v-for="item in headers">
            <a :href="item.link" class="header-h2" v-if="item.level === 2">{{
    item.title
  }}</a>
            <ul v-if="item.level === 3">
              <li class="header">
                <a :href="item.link" :class="['header-h3', { showIndent: showIndent }]">{{ item.title }}</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <!-- <div class="qrcode-container">
        <div>Scan the QRcode to visit on mobile phone</div>
        <div id="qrcode"></div>
      </div> -->
    </div>
  </Teleport>
</template>
<script lang="ts" setup>
import { useData, onContentUpdated } from "vitepress";
import { shallowRef, ref, onMounted, onUpdated } from "vue";
// import QRCode from "easyqrcodejs"
import { getHeaders } from "../utils";

const { frontmatter, theme } = useData();
const headers = shallowRef<any>([]);
const showIndent = ref(false);
const domRef = ref("#app")

onContentUpdated(() => {
  headers.value = getHeaders(frontmatter.value.outline ?? theme.value.outline);
  showIndent.value = headers.value.some((header) => {
    return header.level === 2;
  });
});

onMounted(() => {
  if (window.innerWidth < 1340) {
    domRef.value = "#category-container"
  } else {
    domRef.value = "#app"
  }

  window.onresize = (e) => {
    if (e.target.innerWidth < 1340) {
      domRef.value = "#category-container"
    } else {
      domRef.value = "#app"
    }
  }
})

// onUpdated(() => {
//   const qrcode = document.getElementById("qrcode")!
//   if (qrcode?.childNodes.length > 0) {
//     qrcode.removeChild(qrcode.childNodes[0])
//   }
//   new QRCode(qrcode, {
//     text: location.href,
//     width: 128,
//     height: 128,
//   })
// })
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  position: fixed;
  top: 8rem;
  right: 2rem;
  width: 16rem;
}

.category {
  width: 16rem;
  background: var(--vp-c-bg);
  box-shadow: 6px 6px var(--vp-c-brand);
  border: 4px solid #3f4e4f;
  color: var(--vp-c-brand-light);
  overflow-y: auto;
  max-height: 23rem !important;
}

/* .qrcode-container {
  width: 100%;
  display: flex;
  margin-top: 2rem;
  padding: 1rem;
  background-color: var(--vp-c-bg-alt);
  border-radius: 1rem;
  font-size: smaller;
} */

@media screen and (max-width: 1340px) {
  .container {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    position: static;
    top: 0;
    left: 0;
    width: 100%;
  }

  .category {
    flex: 1;
  }

  /* .qrcode-container {
    margin-top: 0;
    margin-left: 1rem;
    width: 16rem;
  } */
}

@media screen and (max-width: 768px) {
  .category {
    width: 100%;
  }

  /* .qrcode-container {
    display: none;
  } */
}

.list {
  padding-left: 1.25em;
  margin: 1rem 0;
  line-height: 1.7;
  list-style-type: none;
  box-sizing: border-box;
}

.showIndent {
  padding-left: 1rem;
}

ul {
  list-style-type: none;
}

.header {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (min-width: 768px) {
  .category {
    max-height: 400px;
  }
}

@media (min-width: 1024px) {
  .category {
    max-height: 450px;
  }
}

@media (min-width: 1400px) {
  .category {
    position: fixed;
    right: 20px;
    max-height: 490px;
  }
}
</style>
