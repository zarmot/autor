import * as api from "@autor/api"
export { api }

import * as apis from "./api"
import * as units from "./units"

export function init(
  options: {
    client_options: units.client.Options
  }
) {
  const client = units.client.init(options.client_options)
  const api = apis.init(client.events, client.send)
  
  return {
    client,
    api
  }
} 
export type InitOptions = Parameters<typeof init>["0"]
export type SDK = ReturnType<typeof init>