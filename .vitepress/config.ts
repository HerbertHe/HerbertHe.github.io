import { getPosts, getPostLength } from "./theme/serverUtils"
import { buildBlogRSS } from "./theme/rss"
import MathJax from "markdown-it-mathjax3"
import { withMermaid } from "vitepress-plugin-mermaid"

async function config() {
    return {
        // 对 `pin` 路径进行重写覆盖，对 `draft` 路径进行忽略
        srcExclude:
            process.env.NODE_ENV === "development"
                ? []
                : ["posts/**/$draft*.md"],
        rewrites: {
            "posts/:lang/$pin( *):md": "posts/:lang/:md",
        },
        lang: "en-US",
        title: "Herbert He's Blog",
        description: "Herbert He's Blog",
        head: [
            [
                "link",
                {
                    rel: "icon",
                    type: "image/jpeg",
                    href: "/avatar.jpeg",
                },
            ],
            [
                "meta",
                {
                    name: "author",
                    content: "Herbert He",
                },
            ],
            [
                "meta",
                {
                    property: "og:title",
                    content: "Home",
                },
            ],
            [
                "meta",
                {
                    property: "og:description",
                    content: "Herbert He's Blog",
                },
            ],
        ],
        // cleanUrls: "with-subfolders",
        lastUpdated: false,
        themeConfig: {
            // repo: "clark-cui/homeSite",
            logo: "/avatar.jpeg",
            avator: "/avatar.jpeg",
            search: {
                provider: "local",
            },
            docsDir: "/",
            // docsBranch: "master",
            posts: await getPosts(),
            pageSize: 5,
            postLength: await getPostLength(),
            nav: [
                {
                    text: "🏡Blogs",
                    link: "/",
                },
                {
                    text: "🔖Tags",
                    link: "/tags",
                },
                {
                    text: "📃Archives",
                    link: "/archives",
                },
                {
                    text: "🔧Tools",
                    link: "/tools",
                },
                {
                    text: "💡Idea",
                    link: "https://idea.ibert.me",
                },
                {
                    text: "📄Resume",
                    link: "https://resume.ibert.me",
                },
                {
                    text: "⛽️Sponsor",
                    link: "https://sponsor.ibert.me",
                },
                {
                    text: "🔥RSS",
                    link: "https://ibert.me/feed.xml",
                },
            ],
            socialLinks: [
                { icon: "github", link: "https://github.com/HerbertHe" },
                { icon: "twitter", link: "https://twitter.com/HerbertHe_" },
                {
                    icon: {
                        svg: `<svg role="img" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="20">
            <path d="M874.666667 375.189333V746.666667a64 64 0 0 1-64 64H213.333333a64 64 0 0 1-64-64V375.189333l266.090667 225.6a149.333333 149.333333 0 0 0 193.152 0L874.666667 375.189333zM810.666667 213.333333a64.789333 64.789333 0 0 1 22.826666 4.181334 63.616 63.616 0 0 1 26.794667 19.413333 64.32 64.32 0 0 1 9.344 15.466667c2.773333 6.570667 4.48 13.696 4.906667 21.184L874.666667 277.333333v21.333334L553.536 572.586667a64 64 0 0 1-79.893333 2.538666l-3.178667-2.56L149.333333 298.666667v-21.333334a63.786667 63.786667 0 0 1 35.136-57.130666A63.872 63.872 0 0 1 213.333333 213.333333h597.333334z" ></path>
            </svg>`,
                    },
                    link: "mailto:hi@ibert.me",
                },
            ],
            // outline: 2, //设置右侧aside显示层级
            aside: false,
            // blogs page show firewokrs animation
            showFireworksAnimation: false,
        },
        buildEnd: buildBlogRSS,
        ...withMermaid({
            markdown: {
                theme: "nord",
                languages: [
                    "diff",
                    "rust",
                    "vhdl",
                    "git-commit",
                    "dart",
                    "ts",
                    "js",
                    "python",
                    "jsx",
                ],
                lineNumbers: true,
                config: (md) => {
                    md.use(MathJax)
                },
                math: true,
            },
            mermaid: {
                theme: "forest",
                darkMode: true,
            },
            mermaidPlugin: {
                class: "mermaid",
            },
        }),
    }
}
export default config()
