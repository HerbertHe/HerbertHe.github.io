import { globby } from "globby"
import matter from "gray-matter"
import fs from "fs-extra"
import { pathsFilter } from "./utils"

interface IPost {
    frontMatter: {
        [key: string]: any
    }
    regularPath: string
    pin?: boolean
}

/**
 * 获取所有文章
 * 支持 `[pin]` 修饰置顶排序
 */
export async function getPosts() {
    let paths = await getPostMDFilePaths()
    let posts = (await Promise.all(
        paths.map(async (item) => {
            const content = await fs.readFile(item, "utf-8")
            const { data } = matter(content)
            data.date = _convertDate(data.date)
            return {
                frontMatter: data,
                regularPath: `/${item.replace(".md", ".html")}`,
            }
        })
    )) as IPost[]

    posts.sort(_compareDate)

    return _pinPosts(posts)
}

/**
 * 支持 `pin-` 排序
 */
function _pinPosts(posts: IPost[]) {
    const includePin: IPost[] = []
    for (let i = 0; i < posts.length; i++) {
        const path = posts[i].regularPath
        const isPin = /^\$pin */.test(path.split("/").at(-1) as string)
        if (isPin) {
            includePin.push({
                ...posts[i],
                pin: true,
                regularPath: path.replace(/\$pin */g, ""),
            })
            posts.splice(i, 1)
            i--
        }
    }

    return [...includePin, ...posts]
}

function _convertDate(date = new Date().toString()) {
    const json_date = new Date(date).toJSON()
    return json_date.split("T")[0]
}

function _compareDate(obj1: IPost, obj2: IPost) {
    return obj1.frontMatter.date < obj2.frontMatter.date ? 1 : -1
}

/**
 * 获取所有的文件
 * 路径屏蔽掉 `draft-` 修饰
 * @returns 文章路径数组
 */
async function getPostMDFilePaths() {
    let paths = await globby(["**.md"], {
        ignore: ["node_modules", "README.md"],
    })

    return pathsFilter(paths.filter((item) => item.includes("posts/")))
}

export async function getPostLength() {
    // getPostMDFilePath return type is object not array
    return [...(await getPostMDFilePaths())].length
}
