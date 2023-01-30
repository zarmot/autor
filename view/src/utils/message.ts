import { message } from "antd"
import { ArgsProps } from "antd/es/message"

export default function showMessage(
  content: ArgsProps["content"],
  type?: ArgsProps["type"],
  config?: ArgsProps
) {
  message.open({
    ...config,
    content,
    type
  })
}