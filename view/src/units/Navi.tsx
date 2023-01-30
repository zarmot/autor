import { useState, useEffect } from "react"
import { Menu, MenuProps } from "antd";
import {
  CodeFilled,
  HomeOutlined,
  ControlOutlined,
  ThunderboltOutlined,
  PlaySquareOutlined,
  TableOutlined,
  AlignLeftOutlined
} from "@ant-design/icons";

import useApp from "@/hooks/useApp"
import useConfig from "@/hooks/useConfig"

type MenuItem = Required<MenuProps>['items'][number]
const items: MenuItem[] = [
  {
    key: "autor",
    label: <div id="agui-title">Autor</div>,
    icon: <CodeFilled style={{ fontSize: "20px" }} />,
    children: [
      { key: "home", label: "Home", icon: <HomeOutlined /> },
      { key: "config", label: "Config", icon: <ControlOutlined /> }
    ]
  },
  { key: "run", label: "Run", icon: <ThunderboltOutlined /> },
  { key: "tasks", label: "Tasks", icon: <PlaySquareOutlined /> },
  { key: "datas", label: "Datas", icon: <TableOutlined /> },
  { key: "outputs", label: "Outputs", icon: <AlignLeftOutlined /> },
];

export default function AguiNavi() {
  const [openKeys, setOpenKeys] = useState(["autor"])
  const [selectedKeys, setSelectedKeys] = useState(["home"])

  const context = useApp()
  const { change, page } = context

  const { autoHideSubmenu } = useConfig()

  useEffect(() => {
    if (page !== selectedKeys[0]) {
      setSelectedKeys([page])
    }
  }, [page])

  return (
    <Menu
      mode="inline"
      style={{ borderRight: 0 }}

      items={items}
      openKeys={openKeys}
      onOpenChange={(newKeys) => { setOpenKeys(newKeys) }}
      selectedKeys={selectedKeys}
      onSelect={(info) => {
        if (page !== info.selectedKeys[0]) {
          change?.({
            ...context,
            page: info.selectedKeys[0]
          })
        }
        if (autoHideSubmenu) {
          let key = info?.selectedKeys?.[0]
          if (
            key !== "home"
            && key !== "config"
          ) {
            setOpenKeys([])
          }
        }
      }}
    />
  )
}