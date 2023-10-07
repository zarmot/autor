import { readFile } from "fs/promises"
import { sep, extname } from "path"

let jspath = process.cwd()
try {
  const tscfg = eval(`(${await readFile(`${process.cwd()}/tsconfig.json`, "utf8")})`)
  const outdir = tscfg["compilerOptions"]["outDir"]
  if (outdir) {
    jspath += `/${outdir}`
  }
} catch { }

const inits: Array<() => Promise<void>> = []
async function load(path: string) {
  let mod: any
  try { mod = await import(path) } catch { }
  if (mod?.init) {
    inits.push(mod.init)
  }
}
await load(`file://${jspath}/autor.cfg.js`)
const spath = process.argv[2]
const dirs = spath.split(sep).slice(0, -1)
for (let i = 0; i < dirs.length; i++) {
  await load(`file://${jspath}/${dirs.slice(0, i + 1).join("/")}/autor.cfg.js`)
}
await load(`file://${jspath}/${spath.replace(extname(spath), ".cfg.js")}`)
for (let i = 0; i < inits.length; i++) {
  await inits[i]()
}