import { ConfigProvider, Layout, Tabs, TabsProps } from 'antd'
import { Boards } from './features/boards/Boards'
import { theme } from './theme/theme'
import { Auth } from './features/auth/Auth'

const { Content, Footer } = Layout

function App() {
  const items: TabsProps['items'] = [
    { key: 'boards', label: 'Boards', children: <Boards /> },
    { key: 'calendar', label: 'Calendar' },
    { key: 'auth', label: 'Auth', children: <Auth /> },
  ]

  return (
    <ConfigProvider theme={theme}>
      <Layout style={{ minHeight: '100vh', minWidth: '100vw', display: 'flex', flexDirection: 'column', background: 'transperent' }}>
        <Content style={{ flex: 1, overflowY: 'auto' }}>
          <Tabs centered items={items} />
        </Content>
        <Footer></Footer>
      </Layout>
    </ConfigProvider>
  )
}

export default App
