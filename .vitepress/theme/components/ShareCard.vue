<template>
  <div class="shareCard">
    <h1 class="title">
      <span>Hi, I'm Herbert He (he/him)👋</span>
    </h1>
    <p class="description">
      A frondend developer, gopher & open-source developer.
    </p>
    <div class="discord">
      <a href="https://discord.gg/FhsqwcnC">
        <img src="https://dcbadge.vercel.app/api/server/FhsqwcnC" alt="Discord">
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup></script>
<style scoped>
.shareCard {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 15px;
  text-align: center;
}

.title {
  display: flex;
  align-items: center;
  font-size: 2.2em;
  font-weight: bold;
  line-height: 1.2em;
}

.description {
  margin: 1em 0;
}

.discord {
  margin: 1em 0;
}
</style>
