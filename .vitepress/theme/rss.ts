import { dirname } from "path"
import fg from "fast-glob"
import fs from "fs-extra"
import matter from "gray-matter"
import MarkdownIt from "markdown-it"
import type { FeedOptions, Item } from "feed"
import { Feed } from "feed"
import { pathsFilter } from "./utils"

const DOMAIN = "https://ibert.me"
const AUTHOR = {
    name: "Herbert He",
    email: "hi@ibert.me",
    link: DOMAIN,
}
const OPTIONS: FeedOptions = {
    title: "Herbert He",
    description: "Herbert He's Blog",
    id: `${DOMAIN}/`,
    link: `${DOMAIN}/`,
    copyright: "CC BY-NC-SA 4.0",
    feedLinks: {
        json: DOMAIN + "/feed.json",
        atom: DOMAIN + "/feed.atom",
        rss: DOMAIN + "/feed.xml",
    },
    author: AUTHOR,
    image: "https://ibert.me/avatar.jpeg",
    favicon: "https://ibert.me/avatar.jpeg",
}

const markdown = MarkdownIt({
    html: true,
    breaks: true,
    linkify: true,
})

export async function buildBlogRSS() {
    const posts = await generateRSS()
    writeFeed("feed", posts)
}

async function generateRSS() {
    const files = pathsFilter(await fg("posts/**/*.md"))

    const posts: any[] = (
        await Promise.all(
            files
                .filter((i) => !i.includes("index"))
                .map(async (i) => {
                    const raw = await fs.readFile(i, "utf-8")
                    const { data, content } = matter(raw)
                    const html = markdown
                        .render(content)
                        .replace('src="/', `src="${DOMAIN}/`)

                    const pinned = /\$pin */.test(i)

                    return {
                        ...data,
                        title: data.title + `${pinned ? " 📌" : ""}`,
                        date: new Date(data.date),
                        content: html,
                        author: [AUTHOR],
                        pin: pinned,
                        link: `${DOMAIN}/${i
                            .replace(/\$pin */g, "")
                            .replace(".md", ".html")}`,
                    }
                })
        )
    ).filter(Boolean)

    posts.sort((a, b) => +new Date(b.date) - +new Date(a.date))

    return [...posts.filter((i) => i.pin), ...posts.filter((i) => !i.pin)]
}

async function writeFeed(name: string, items: Item[]) {
    const feed = new Feed(OPTIONS)
    items.forEach((item) => feed.addItem(item))

    await fs.ensureDir(dirname(`./.vitepress/dist/${name}`))
    await fs.writeFile(`./.vitepress/dist/${name}.xml`, feed.rss2(), "utf-8")
    await fs.writeFile(`./.vitepress/dist/${name}.atom`, feed.atom1(), "utf-8")
    await fs.writeFile(`./.vitepress/dist/${name}.json`, feed.json1(), "utf-8")
}
