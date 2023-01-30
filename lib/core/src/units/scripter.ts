import * as api from "@autor/api"

import { scan, load } from "../utils/scripter.js"

export function init<Env>(
  options: {
    
    root_name: string
    script_src_path: string
    script_run_path: string
  },
  env: Env,
  events: ServerEvents
) {

  let groups: Ref<ScriptGroupInfo[] | undefined> = { data: undefined }

  const scan_script = async (send: Sender<api.scripter.Data_r_scripts>) => {
    const group = await scan(options.script_src_path, options.script_run_path, options.root_name)
    groups.data = group ? [group] : []
    send(api.scripter.r_scripts, groups.data)
  }

  const on_x_scripts: ServerEvent = async (data, send) => {
    if (groups.data === undefined) {
      scan_script(send)
    } else {
      send(api.scripter.r_scripts, groups.data)
    }
  }
  events[api.scripter.x_scripts] = on_x_scripts

  const on_x_refresh_scripts: ServerEvent = async (data, send) => {
    scan_script(send)
  }
  events[api.scripter.x_refresh_scripts] = on_x_refresh_scripts

  const on_x_run_script: ServerEvent<api.scripter.Data_x_run_script> = async (data, send) => {
    const script = await load(data.script)
    script?.(env, data.data)
  }
  events[api.scripter.x_run_script] = on_x_run_script

  return {
    groups
  }
}