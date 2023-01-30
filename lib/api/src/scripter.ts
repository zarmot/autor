export const prefix = "scripter/"

export type ScriptInfo = {
  src_name: string
  run_path: string
}
export type ScriptGroupInfo = {
  name: string
  path: string
  scripts: ScriptInfo[]
  groups?: ScriptGroupInfo[]
}

export const x_scripts = prefix + "x_scripts"

export const x_refresh_scripts = prefix + "x_refresh_scripts"

export const r_scripts  = prefix + "r_scripts"
export type Data_r_scripts = ScriptGroupInfo[]

export const x_run_script = prefix + "x_run_script"
export type Data_x_run_script<DataType = any> = {
  script: ScriptInfo
  data?: DataType
}
