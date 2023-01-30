import { Typography, Card, Form, Switch } from "antd"

import useLocalConfig from "@/hooks/useConfig"
import showMessage from "@/utils/message"

const { Title } = Typography

export default function Config() {
  const localConfig = useLocalConfig()
  const { save } = localConfig

  const [form] = Form.useForm()

  return (
    <div className="agui-page">
      <Typography>
        <Title level={3}>Config</Title>
        <Card className='agui-card'>
          <Form
            form={form}
            style={{ marginTop: "24px" }}
            labelCol={{ span: 4 }}
            layout="horizontal"
          >
            <Form.Item label="Auto Hide Submenu">
              <Switch 
                defaultChecked={localConfig.autoHideSubmenu}
                onChange={(value) => {
                  save?.({
                    ...localConfig,
                    autoHideSubmenu: value
                  })
                  showMessage(`Auto Hide Submenu: "${value}" saved.`, "success")
                }}
              />
            </Form.Item>
          </Form>
        </Card>
      </Typography>
    </div>
  )
}