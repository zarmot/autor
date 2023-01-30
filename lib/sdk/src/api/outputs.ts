import * as api from "@autor/api"

import { Event, Events } from "../utils/client"

export function init(events: Events, send: (type: string, data: any) => void) {
  return {
    set_on_r_current_output(fn: Event<api.outputs.Data_r_current_output>) {
      events[api.outputs.r_current_output] = fn
    }
  }
}