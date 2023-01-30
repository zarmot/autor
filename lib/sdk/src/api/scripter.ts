import * as api from "@autor/api"

import { Event, Events } from "../utils/client"

export function init(events: Events, send: (type: string, data: any) => void) {
  return {
    x_scripts() {
      send(api.scripter.x_scripts, undefined)
    },
    x_refresh_scripts() {
      send(api.scripter.x_refresh_scripts, undefined)
    },
    set_on_r_scripts(fn: Event<api.scripter.Data_r_scripts>) {
      events[api.scripter.r_scripts] = fn
    },
    x_run_script(data: api.scripter.Data_x_run_script) {
      send(api.scripter.x_run_script, data)
    }
  }
}