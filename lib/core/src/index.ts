import * as api from "@autor/api"

import * as utils from "./utils/index.js"
export { utils }

import * as units from "./units/index.js"
export function init<Env>(options: {
  env: Env
  scripter_options: Parameters<typeof units.scripter.init>["0"]
}) {
  const events: ServerEvents = {}
  const server = utils.server.start(events)
  const boardcast: Sender = (type: string, data: any) => {
    server.clients.forEach((client) => {
      utils.server.send(client, type, data)
    })
  }

  const scripter = units.scripter.init<Env>(options.scripter_options, options.env, events)
  const outputs = units.outputs.init(boardcast)

  return {
    events,
    server,
    scripter,
    outputs
  }
}

declare global {
  type Ref<T> = { data: T }

  //core
  type Core = ReturnType<typeof init>

  //utils/server
  type Sender<DataType = any> = (type: string, data: DataType) => void
  type ServerEvent<DataType = any> = (
    data: DataType,
    send: Sender
  ) => Promise<void>
  type ServerEvents<DataType = any> = Record<string, ServerEvent<DataType>>
  type ServerMessage<DataType = any> = { type: string, data: DataType }

  //utils/scripter
  type ScriptInfo = api.scripter.ScriptInfo
  type ScriptGroupInfo = api.scripter.ScriptGroupInfo
  type Script<Env, Data = any> = (env: Env, Data: Data) => Promise<void>

  //utils/tasker
  type Task = {
    start: (finish: () => void) => void
    stop: () => void

    get_progress: () => number
  }

  //units/outputs
  type OutputBlock = api.outputs.OutputBlock
}