<template>
    <div class="main">
        <h1 class="header">Self-deployed Tools</h1>
        <ol class="tool-ol">
            <li class="tool-li" v-for="tool in tools">
                <a :href="tool.href">{{ tool.name }}</a>
            </li>
        </ol>

        <div>
            <p>自部署平台可能会因为代码更新、服务上下线、运维维护等原因，导致某时段服务不可用。</p>
            
            <br>
            <p>建议加入 Discord 服务</p>
            <a href="https://discord.gg/VZRPE9qeVv">
                <img src="https://discord.badge.ibert.me/api/server/VZRPE9qeVv" alt="Discord">
            </a>

            <br>
            <p>或者，关注下面的微信公众号，便于及时获取通知信息。</p>
            <img src="/img/mp-qrcode.png" alt="微信公众号二维码" width="300">
        </div>
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
    name: "ChatGPT Next",
    href: "https://nchat.ibert.me"
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

.tool-ol a:hover {
    text-decoration: underline;
}

.tool-li {
    margin: 10px;
}

img {
    margin: 15px 0;
}
</style>