import { useLayoutEffect, useRef } from "react"
import { Card, Checkbox } from "antd"

import useOutputs from "@/hooks/useOutputs"

export default function Output() {
  const view = useRef<HTMLDivElement>(null)
  const content = useRef<HTMLDivElement>(null)
  const outputs = useOutputs()

  useLayoutEffect(() => {
    if (view.current && content.current) {
      content.current.innerHTML = outputs.current?.map(v => v.content).join("<br/>") ?? ""
      view.current.scrollTo(0, view.current.scrollHeight)
    }
  }, [outputs])

  return (
    <Card
      ref={view}
      style={{
        height: "100%",
        overflow: "auto"
      }}
    >
      <div ref={content} />
    </Card>
  )
}