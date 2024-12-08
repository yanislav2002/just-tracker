import { ThemeConfig } from 'antd'

export const theme: ThemeConfig = {
  token: {
    borderRadius: 6,
    fontSize: 16,
  },
  components: {
    Button: {
      colorPrimary: '#2DC653',
      colorPrimaryHover: '#2DC653',
      colorPrimaryActive: '#2DC653',
    },
    Tabs: {
      colorBgLayout: 'red',
      colorPrimary: '#2DC653',
      colorPrimaryHover: '#2DC653',
      colorPrimaryActive: '#155D27',
    },
    Collapse: {
      headerBg: '#eff1ed',
    },
    Radio: {
      colorPrimary: '#2DC653',
      colorPrimaryHover: '#2DC653',
      colorPrimaryActive: '#2DC653',
    }
  },
}
