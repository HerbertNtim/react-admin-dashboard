import { Layout, Space } from "antd"
import CurrentUser from "./current-user"

const headerStyles: React.CSSProperties = {
  background: '#fff',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  padding: '0 24px',
  position: 'sticky',
  top: '0',
  zIndex: '999'
}

const Header = () => {
  return (
    <Layout.Header style={headerStyles}>
      <Space size={'middle'} align="center">
        <CurrentUser />
      </Space>
    </Layout.Header>
  )
}

export default Header