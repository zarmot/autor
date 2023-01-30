import { theme, Layout } from "antd"

import { AppProvider } from "@/hooks/useApp"
import { ConfigProvider } from "@/hooks/useConfig"
import { OutputsProvider } from "@/hooks/useOutputs"

import AguiNavi from "@/units/Navi"
import AutorPage from "@/pages"

import "@/utils/autor"

import "./agui.css"

const { Sider, Content } = Layout

export default function Agui() {
  const {
    token: {
      colorBgContainer
    }
  } = theme.useToken();

  const layout = (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        style={{
          background: colorBgContainer
        }}
      >
        <AguiNavi />
      </Sider>
      <Content
        style={{
          height: "100vh",
          overflow: "auto",
          backgroundColor: "#101010"
        }}
      >
        <AutorPage />
      </Content>
    </Layout>
  )

  return (
    <AppProvider>
      <ConfigProvider>
        <OutputsProvider>
          {layout}
        </OutputsProvider>
      </ConfigProvider>
    </AppProvider>
  )
}