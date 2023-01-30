import { Typography, Divider } from "antd"
import {
  GithubOutlined,
  ThunderboltOutlined,
  PlaySquareOutlined,
  TableOutlined,
  AlignLeftOutlined
} from "@ant-design/icons"

import useApp from "@/hooks/useApp"

const { Title, Paragraph } = Typography;

export default function Home() {
  const context = useApp()
  const { change } = context

  return (
    <div className="agui-page">
      <Typography>
        <Title>Autor</Title>
        <Paragraph>
          <a target="_blank" href='https://github.com/zarmot/autor'><GithubOutlined /> Github Repo: zarmot/autor</a>
        </Paragraph>
        <Paragraph>
          TypeScript/Node.js Scripting Tools.
        </Paragraph>
        <Paragraph>
          GUI Version: <strong>A100.0</strong> &nbsp;&nbsp;&nbsp; Build Time: <strong>2023.01.30</strong>
        </Paragraph>

        <Divider />
        <Paragraph>
          <a onClick={() => { change?.({ ...context, page: "run" }) }}><strong><ThunderboltOutlined /> Run</strong></a> 
          &nbsp; page can list and run your scripts or execute commands, if server start in debug mode, the breakpoint you set in the script should be triggered correctly.
        </Paragraph>
        <Paragraph>
          <a onClick={() => { change?.({ ...context, page: "tasks" }) }}><strong><PlaySquareOutlined /> Tasks</strong></a> 
          &nbsp; page can show the currently ongoing and planned tasks, view information such as progress and logs, and stop or cancel tasks.
        </Paragraph>
        <Paragraph>
          <a onClick={() => { change?.({ ...context, page: "datas" }) }}><strong><TableOutlined /> Datas</strong></a> 
          &nbsp; page can visually view the data that you have configured. 
        </Paragraph>
        <Paragraph>
          <a onClick={() => { change?.({ ...context, page: "outputs" }) }}><strong><AlignLeftOutlined /> Outputs</strong></a> 
          &nbsp; page can view the information output by the script.
        </Paragraph>
      
      </Typography>
    </div>
  )
}