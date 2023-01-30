const SrcPath = "C:/Users/Zarmot/Projects/github/zarmot/autor/works/scripts/"
const RunPath = "file://C:/Users/Zarmot/Projects/github/zarmot/autor/works/.build/scripts/"

import * as core from "@autor/core"

export async function start() {
    const env: Env = {
        core: undefined as any
    }
    env.core = core.init<Env>({
        env,
        scripter_options: {
            root_name: "scripts",
            script_src_path: SrcPath,
            script_run_path: RunPath
        }
    })
}
start()

declare global {
    type Env = {
        core: Core
    }
}