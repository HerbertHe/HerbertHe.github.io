<template>
    <div class="main">
        <h1 class="header">Self-deployed Tools</h1>
        <ol class="tool-ol">
            <li class="tool-li" v-for="tool in tools">
                <a :href="tool.href">{{ tool.name }}</a>
            </li>
        </ol>
    </div>
</template>

<script setup lang="ts">
const tools = [{
    name: 'Drawio',
    href: "https://drawio.ibert.me"
}, {
    name: 'Book Searcher',
    href: "https://zlib.ibert.me"
}, {
    name: "Chat酱",
    href: "https://ichat.ibert.me"
},
{
    name: 'IT Tools',
    href: "https://tools.jieec.cn"
}]
</script>

<style scoped>
.main {
    margin: 0 auto;
    padding: 0.5rem 1.5rem 4rem;
    max-width: 48rem;
}

.header {
    font-weight: bold;
    padding-bottom: 14px;
    font-size: 2.25em;
    margin-top: 24px;
    line-height: 1.3em;
}

.tool-ol {
    list-style: upper-roman;
    margin: 20px 0;
}

.tool-li {
    margin: 10px;
}
</style>