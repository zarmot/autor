export type Event<DataType = any> = (data: DataType) => Promise<void>
export type Events = { [type: string]: Event }
export type Message = { type: string, data: any }

export function start(
    events: Events,
    url?: string,
    onopen?: WebSocket["onopen"],
    onerror?: WebSocket["onerror"],
    onclose?: WebSocket["onclose"]
) {
    let ws = new WebSocket(url ?? "ws://127.0.0.1:13571")
    ws.onopen = onopen ?? null
    ws.onerror = onerror ?? null
    ws.onclose = onclose ?? null
    ws.onmessage = (e) => {
        const msg = JSON.parse(e.data.toString()) as Message
        const type = msg.type
        if (type) {
            const event: Event | undefined = events[type]
            event?.(msg.data)
        }
    }
    return ws
}

export function send(ws: WebSocket, type: string, data: any) {
    ws.send(JSON.stringify({ type, data }))
}