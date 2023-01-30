import * as fs from "fs/promises"
import { basename, extname } from "path"

export async function scan(srcpath: string, runpath: string, name: string) {
    let r: ScriptGroupInfo = { name, path: srcpath, scripts: [] }
    let snames = await fs.readdir(srcpath)
    for (const i in snames) {
        const sname = snames[i]
        const spath = srcpath + sname
        let sstat = await fs.stat(spath)
        if (sstat.isDirectory()) {
            let sdir = await scan(spath + "/", runpath + sname + "/", sname)
            if (sdir) {
                if (r.groups === undefined) {
                    r.groups = []
                }
                r.groups.push(sdir)
            }
        } else {
            let ext = extname(sname)
            if (ext === ".ts") {
                const nname = basename(sname, ".ts") + ".js"
                let script: ScriptInfo = {
                    src_name: sname,
                    run_path: runpath + nname
                }
                r.scripts.push(script)
            } else if (ext === ".js") {
                let script: ScriptInfo = {
                    src_name: sname,
                    run_path: runpath + sname
                }
                r.scripts.push(script)
            } 
        }
    }
    return r.scripts.length > 0 || (r.groups?.length && r.groups.length > 0) ? r : undefined
}

export async function load(script: ScriptInfo): Promise<Script<any> | undefined> {
    let mod = await import(script.run_path + `?r=${Date.now()}`)
    return mod?.run
}