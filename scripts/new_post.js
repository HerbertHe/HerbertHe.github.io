// TODO 新建一个文章
import readline from "readline/promises"
import path from "path"
import fs from "fs"

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

const post_path = path.resolve("posts")

const dirs = fs
    .readdirSync(post_path)
    .filter((file) => fs.lstatSync(path.join(post_path, file)).isDirectory())

/**
 * 更新模板文件
 * @param {string} title
 * @param {string} tags
 * @param {string} categories
 * @returns
 */
const update_template = (title, tags, categories) => {
    return `---
title: ${title}
date: ${new Date().toLocaleString().replace(/\//g, "-")}
toc: true
tags: [ ${tags} ]${!!categories ? `\ncategories: [ $${categories} ]` : ""}
---\n`
}

rl.question(`请输入选择的文章存储文件夹: (可选: ${dirs.join(", ")})\n`)
    .then(async (folder) => {
        if (!folder) {
            throw new Error("文件夹不能为空")
        }

        if (!dirs.includes(folder.trim().toLowerCase())) {
            throw new Error("不正确的文件夹输入")
        }

        const title = await rl.question("请输入文章标题:\n").then((title) => {
            if (!title) {
                throw new Error("标题不能为空")
            }
            return title.trim()
        })

        const draft = await rl
            .question("是否保存为草稿? (y/N)\n")
            .then((draft) => {
                if (!draft || draft.toLowerCase() === "y") {
                    return true
                }
                return false
            })

        const pin = await rl.question("是否置顶? (n/Y)\n").then((pin) => {
            if (!pin || pin.toLowerCase() === "n") {
                return false
            }
            return true
        })

        const tags = await rl
            .question("请输入标签, 以空格分隔:\n")
            .then((tags) => {
                return tags
                    .trim()
                    .split(" ")
                    .filter((t) => !!t)
                    .join(", ")
            })

        const categories = await rl
            .question("请输入分类, 以空格分隔:\n")
            .then((categories) => {
                return categories
                    .trim()
                    .split(" ")
                    .filter((t) => !!t)
                    .join(", ")
            })

        let filename = draft
            ? `$draft ${title}.md`
            : pin
            ? `$pin ${title}.md`
            : `${title}.md`

        const filepath = path.join(
            post_path,
            folder.trim().toLowerCase(),
            filename
        )

        const template = update_template(title, tags, categories)
        fs.writeFileSync(filepath, template)
    })
    .finally(() => {
        rl.close()
    })
