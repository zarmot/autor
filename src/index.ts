import fs from "fs/promises"
import { extname } from "path"
import { pathToFileURL } from "url"

declare global {
    interface Config { }
    var CFG: Config
}
global.CFG = {} as any

const root = process.cwd()

async function load(path: string, inits: Array<() => Promise<void>>) {
    let mod: any
    try { mod = await import(pathToFileURL(path).href) } catch { }
    if (mod?.init) {
        inits.push(mod.init)
    }
}

//env
const env_inits: Array<() => Promise<void>> = []
async function load_dir(path: string) {
    const ls = await fs.readdir(path, {
        withFileTypes: true,
        recursive: false,
    })
    const dirs: string[] = []
    for (let i = 0; i < ls.length; i++) {
        const e = ls[i];
        if (e.isFile() && e.name == "0.ts") {
            await load(`${path}/0.ts`, env_inits)
            return
        } else if (e.isDirectory()) {
            dirs.push(e.name)
        }
    }
    for (let i = 0; i < dirs.length; i++) {
        const dir = dirs[i];
        await load_dir(`${path}/${dir}`)
    }
}
await load_dir(`${root}/env`)

//cfg
const cfg_inits: Array<() => Promise<void>> = []
await load(`${root}/.autor.ts`, cfg_inits)
const spath = (process.argv[2] ?? "").replaceAll("\\", "/")
const dirs = spath.split("/").slice(0, -1)
for (let i = 0; i < dirs.length; i++) {
    await load(`${root}/${dirs.slice(0, i + 1).join("/")}/.autor.ts`, cfg_inits)
}
await load(`${root}/${spath.replace(extname(spath), ".cfg.ts")}`, cfg_inits)

//env-inits
for (let i = 0; i < env_inits.length; i++) {
    await env_inits[i]()
}
//cfg-inits
for (let i = 0; i < cfg_inits.length; i++) {
    await cfg_inits[i]()
}
