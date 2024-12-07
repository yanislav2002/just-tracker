import { Flex, Form, Input, Row, Switch } from 'antd'

export const Auth: React.FC = () => {
  return (
    <Row>
      <Flex gap='2em' vertical justify='center' style={{ width: '60vw', minWidth: '600px' }}>
        <Form>
          <Form.Item label='Login'>
            <Switch />
          </Form.Item>

          <Form.Item label='User name'>
            <Input />
          </Form.Item>

          <Form.Item label='Mail'>
            <Input type='' />
          </Form.Item>

          <Form.Item label='Password'>
            <Input.Password type='' />
          </Form.Item>

          <Form.Item label='Repeat password'>
            <Input.Password type='' />
          </Form.Item>
        </Form>
      </Flex>
    </Row>
  )
}
