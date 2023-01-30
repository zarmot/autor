import { ConfigProvider, theme } from "antd"
import "antd/dist/reset.css"

import Agui from "./Agui"

import "./app.css"

export default function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#245bff"
        }
      }}
    >
      <Agui/>
    </ConfigProvider>
  )
}
