import { useEffect, useState } from "react"
import { Typography, Card, Button, Tree } from "antd"
import { SyncOutlined, PlayCircleOutlined } from "@ant-design/icons"

import { api } from "@autor/sdk"

import autor from "@/utils/autor"

import Output from "./Output"

import "./style.css"

const { Title } = Typography

function mapGroup(group: api.scripter.ScriptGroupInfo): any {
  const groups = group.groups?.map(mapGroup)
  const scripts = group.scripts.map((script) => {
    return {
      title: script.src_name,
      key: script.run_path,
      data: script
    }
  })
  return {
    selectable: false,
    title: group.name,
    key: group.path,
    children: groups?.concat(scripts) ?? scripts
  }
}
export default function Run() {
  const [treeData, setTreeData] = useState<any>()
  const [selected, setSelected] = useState<api.scripter.ScriptInfo | null>(null)

  useEffect(() => {
    autor?.api.scripter.set_on_r_scripts(async (data) => {
      setTreeData(data.map(mapGroup))
    })
  }, [autor])
  useEffect(() => {
    autor?.api.scripter.x_scripts()
  }, [autor])

  return (
    <div className="agui-page">
      <Typography>
        <Title level={3}>Run</Title>
        <Card className='agui-card'>
          <div id="agui-pages-run-card">
            <div id="agui-pages-run-card-left">
              <Button.Group style={{ width: "100%" }}>
                <Button
                  type="primary"
                  style={{ width: "50%" }}
                  disabled={selected === null}
                  onClick={() => {
                    if (selected) {
                      autor?.api.scripter.x_run_script({ script: selected })
                    }
                  }}
                >
                  <PlayCircleOutlined /> Execute
                </Button>
                <Button 
                  style={{ width: "50%" }}
                  onClick={() => {
                    autor?.api.scripter.x_refresh_scripts()
                  }}
                >
                  <SyncOutlined /> Refresh
                </Button>
              </Button.Group>
              <div id="agui-pages-run-card-left-tree">
                <Tree
                  treeData={treeData}
                  onSelect={(keys, info) => {
                    if (info.selected) {
                      setSelected((info.node as any).data)
                    } else {
                      setSelected(null)
                    }
                  }}
                />
              </div>
            </div>
            <div id="agui-pages-run-card-right">
              <Output />
            </div>
          </div>
        </Card>
      </Typography>
    </div>
  )
}