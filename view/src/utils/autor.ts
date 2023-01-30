import * as sdk from "@autor/sdk"

const options: sdk.InitOptions = {
  client_options: {
    hooks: {}
  }
}
const autor = sdk.init(options)
export type Autor = typeof autor
export default autor

options.client_options.hooks.on_close = () => {
  autor.client.connect()
}
autor.client.connect()