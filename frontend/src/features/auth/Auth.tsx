import { Button, Flex, Form, Input, Radio, Row, Switch } from 'antd'
import { postLoginParamsAsync } from './AuthSlice'
import { useAppDispatch } from '../../app/hooks'

type FormValues = {
  isRadioLogin: boolean
  username: string
  password: string
  repeatPassword: string
  mail: string
}

export const Auth: React.FC = () => {
  const dispatch = useAppDispatch()

  const [form] = Form.useForm<FormValues>()

  const onFinish = (values: FormValues) => {
    console.log(values)
    dispatch(postLoginParamsAsync(values))
  }

  return (
    <Row justify='center'>
      <Flex gap='2em' vertical justify='center' style={{ width: '30vw', minWidth: '200px' }}>
        <Form form={form} onFinish={onFinish} layout='vertical'>
          <Form.Item name='isRadioLogin'>
            <Radio.Group buttonStyle='solid'>
              <Radio.Button value='login'>Login</Radio.Button>
              <Radio.Button value='register'>Register</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item label='User name' name='username'>
            <Input />
          </Form.Item>

          <Form.Item label='Mail' name='mail'>
            <Input type='' />
          </Form.Item>

          <Form.Item label='Password' name='password'>
            <Input.Password type='' />
          </Form.Item>

          <Form.Item label='Repeat password' name='repeatPassword'>
            <Input.Password type='' />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </Row>
  )
}
