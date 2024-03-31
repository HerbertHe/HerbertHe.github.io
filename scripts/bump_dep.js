import fs from "fs"
import path from "path"
import { execSync } from "child_process"

const packageJsonPath = path.resolve("package.json")

const { devDependencies, dependencies } = JSON.parse(
    fs.readFileSync(packageJsonPath, "utf8")
)

const update = () => {
    const devD = Object.keys(devDependencies).join(" ")
    const depD = Object.keys(dependencies).join(" ")

    execSync(`yarn add --dev ${devD}`)
    execSync(`yarn add ${depD}`)
}

update()
