import { WebSocket, WebSocketServer, ServerOptions } from "ws"

export function start(
    events: ServerEvents,
    sinfo?: string,
    options?: ServerOptions
) : WebSocketServer {
    const wss = new WebSocketServer({
        port: 13571,
        ...options
    })

    wss.on("connection", (ws) => {
        ws.on("message", (data) => {
            const msg = JSON.parse(data.toString()) as ServerMessage
            const type = msg.type
            if (type) {
                console.log(`event "${type}".`)
                const event: ServerEvent | undefined = events[type]
                event?.(msg.data, (type, data) => { send(ws, type, data) })
            }
        })
        console.log("connected.")
        send(ws, "connected", sinfo)
    })

    console.log("server started.")

    return wss
}
export function send(ws: WebSocket, type: string, data: any) {
    ws.send(JSON.stringify({ type, data }))
}