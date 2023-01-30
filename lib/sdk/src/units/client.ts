import * as utils from "../utils"

export function init(
  options: {
    hooks: {
      on_open?: () => void
      on_error?: () => void
      on_close?: () => void
    }
  }
) {
  const events: utils.client.Events = {}

  let ws: WebSocket | undefined
  let err: Event | undefined
  let status: "idle" | "connecting" | "connected" | "error" | "closed" = "idle"

  const send = (type: string, data: any) => { 
    if (ws?.readyState === WebSocket.OPEN) {
      utils.client.send(ws, type, data)
    } else {
      console.log("err: unconnected")
    }
  }

  const onopen: WebSocket["onopen"] = (e) => {
    status = "connected"
    options.hooks.on_open?.()
  }
  const onerror: WebSocket["onerror"] = (e) => {
    status = "error"
    err = e
    options.hooks.on_error?.()
  }
  const onclose: WebSocket["onclose"] = (e) => {
    status = "closed"
    options.hooks.on_close?.()
  }
  const connect = (url?: string) => {
    status = "connecting"
    ws = utils.client.start(events, url, onopen, onerror, onclose)
  }

  return {
    events,

    ws,
    err,
    status,

    send,
    connect
  }
}
export type Options = Parameters<typeof init>["0"]