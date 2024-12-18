import { ConfigProvider, Layout, Tabs, TabsProps } from 'antd'
import { Boards } from './features/boards/Boards'
import { theme } from './theme/theme'
import { Auth } from './features/auth/Auth'
import { Logout } from './components/Logout'
import { useAppSelector } from './app/hooks'
import { selectAuthDetails } from './features/auth/AuthSlice'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'


const { Content, Footer } = Layout

function App() {

  const { userId } = useAppSelector(selectAuthDetails)

  const items: TabsProps['items'] = [
    { key: 'boards', label: 'Boards', children: <Boards /> },
    { key: 'calendar', label: 'Calendar' },
    ...(userId === undefined ? [{ key: 'auth', label: 'Account', children: <Auth /> }] : [])
  ]

  return (
    <ConfigProvider theme={theme}>
      <DndProvider backend={HTML5Backend}>
        <Layout style={{ minHeight: '100vh', minWidth: '100vw', display: 'flex', flexDirection: 'column', background: 'transperent' }}>
          <Content style={{ flex: 1, overflowY: 'auto' }}>
            <Tabs
              centered
              items={items}
              tabBarExtraContent={userId !== undefined ? <Logout /> : undefined}
            />
          </Content>
          <Footer></Footer>
        </Layout>
      </DndProvider>
    </ConfigProvider>
  )
}

export default App
