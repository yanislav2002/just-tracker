import { Button, Flex, Form, Input, Radio, RadioChangeEvent, Row } from 'antd'
import { AuthMode, postLoginParamsAsync, radioLoginChanged, selectAuthDetails } from './AuthSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks'


type FormValues = {
  authMode: AuthMode
  username: string
  password: string
  repeatPassword: string
  mail: string
}

const setFormInitialValues = (authMode: AuthMode): FormValues => {
  return {
    username: '',
    password: '',
    repeatPassword: '',
    mail: '',
    authMode: authMode
  }
}

export const Auth: React.FC = () => {
  const dispatch = useAppDispatch()
  
  const authDetails = useAppSelector(selectAuthDetails)
  const isAuthModeLogin = authDetails.authMode === 'login'
  
  const [form] = Form.useForm<FormValues>()

  const onRadioChange = (e: RadioChangeEvent) => {
    dispatch(radioLoginChanged(e.target.value))
  }
  
  const onFinish = (values: FormValues) => {
    dispatch(postLoginParamsAsync(values))
    
    form.resetFields()
  }
  
  const radioButtons: { value: string, label: string }[] = [
    {value: 'login', label: 'Login'},
    {value: 'register', label: 'Register'}
  ]
  
  return (
    <Row justify='center'>
      <Flex gap='2em' vertical justify='center' style={{ width: '30vw', minWidth: '200px' }}>
        <Form 
          form={form} 
          onFinish={onFinish} 
          initialValues={setFormInitialValues(authDetails.authMode)}
          layout='vertical'
        >
          <Form.Item 
            name='authMode'
          >
            <Radio.Group 
              buttonStyle='solid'
              onChange={onRadioChange}
            >
              {radioButtons.map((radio) => (
                <Radio.Button key={radio.value} value={radio.value}>
                  {radio.label}
                </Radio.Button>
              ))}
            </Radio.Group>
          </Form.Item>

          <Form.Item 
            name='username'
            label='User name' 
            hidden={isAuthModeLogin}
            rules={[
              { required: !isAuthModeLogin, message: 'Please enter username!' },
              { min: 3, max: 30 }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item 
            name='mail'
            label='Mail Address' 
            rules={[
              { required: true, message: 'Please enter mail!' },
              {
                validator: (_, value) => {
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                  
                  if (!value || emailRegex.test(value)) {
                    return Promise.resolve()
                  }
                  
                  return Promise.reject(new Error('Please enter a valid email!'))
                },
              },
            ]}
          >
            <Input type='' />
          </Form.Item>

          <Form.Item 
            name='password'
            label='Password' 
            rules={[
              { required: true, message: 'Please enter password!' },
              { min: 6, max: 30 }
            ]}
          >
            <Input.Password type='' />
          </Form.Item>

          <Form.Item 
            name='repeatPassword'
            label='Repeat password'  
            hidden={isAuthModeLogin}
            dependencies={['password']}
            rules={[
              { required: !isAuthModeLogin, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  
                  return Promise.reject(new Error('Passwords do not match!'))
                },
              }),
            ]}
          >
            <Input.Password type='' />
          </Form.Item>

          <Form.Item style={{ display: 'flex', justifyContent: 'end' }}>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </Row>
  )
}
