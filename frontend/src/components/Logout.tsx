import { LogoutOutlined } from "@ant-design/icons"
import { FloatButton } from "antd"
import { logout } from "../features/auth/AuthSlice"
import { useAppDispatch } from "../app/hooks"


export const Logout: React.FC = () => {
  const dispatch = useAppDispatch()
  
  const onClick = () => {
    dispatch(logout())
  }
      
  return (
    <FloatButton 
      type='primary'
      icon={<LogoutOutlined />}
      style={{ position: 'relative', insetBlockEnd: 'unset', bottom: 'unset', marginLeft: '40px' }}
      onClick={ onClick }
    />
  )
}