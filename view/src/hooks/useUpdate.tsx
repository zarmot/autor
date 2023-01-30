import { useState } from "react"

function inc(v: number) {
    return v + 1
}
export default function useUpdate() {
    const [flag, setFlag] = useState(0)
    return () => {
        setFlag(inc)
    }
}