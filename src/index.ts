import fs from "fs/promises"
import { sep, extname } from "path"

declare global {
    interface Config { }
    var CFG: Config
}
global.CFG = {} as any

let jspath = `${process.cwd()}/.built`

async function load(path: string, inits: Array<() => Promise<void>>) {
    let mod: any
    try { mod = await import(`file://${path}`) } catch { }
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
        if (e.isFile() && e.name == "0.js") {
            await load(`${path}/0.js`, env_inits)
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
await load_dir(`${jspath}/env`)

//cfg
const cfg_inits: Array<() => Promise<void>> = []
await load(`${jspath}/autor.cfg.js`, cfg_inits)
const spath = process.argv[2]
const dirs = spath.split(sep).slice(0, -1)
for (let i = 0; i < dirs.length; i++) {
    await load(`${jspath}/${dirs.slice(0, i + 1).join("/")}/autor.cfg.js`, cfg_inits)
}
await load(`${jspath}/${spath.replace(extname(spath), ".cfg.js")}`, cfg_inits)

//env-inits
for (let i = 0; i < env_inits.length; i++) {
    await env_inits[i]()
}
//cfg-inits
for (let i = 0; i < cfg_inits.length; i++) {
    await cfg_inits[i]()
}