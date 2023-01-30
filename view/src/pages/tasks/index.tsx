import { Typography } from "antd"

import "./style.css"

const { Title, Paragraph } = Typography

export default function Tasks() {
  return (
    <div className="agui-page">
      <Typography>
        <Title level={3}>Tasks</Title>
        <Paragraph>
          Unavailable yet
        </Paragraph>
        {/* <Card className='agui-card'>
        <div id="agui-pages-run-card">
            <div id="agui-pages-run-card-left">
            </div>
            <div id="agui-pages-tasks-card-right">
              <Card style={{ height: "100%", overflow: "auto"}}>
                Outputs:<br/>
              </Card>
            </div>
          </div>
        </Card> */}
      </Typography>
    </div>
  )
}