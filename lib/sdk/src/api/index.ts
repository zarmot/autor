import * as scripter from "./scripter"
export { scripter}

import * as outputs from "./outputs"
export { outputs }

import { Events } from "../utils/client"
export function init(events: Events, send: (type: string, data: any) => void) {
  return {
    scripter: scripter.init(events, send),
    outputs: outputs.init(events, send)
  }
}