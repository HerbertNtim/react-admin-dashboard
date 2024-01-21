import { ThemedLayoutV2 } from "@refinedev/antd"
import Header from "./Header"

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <ThemedLayoutV2
      Header={Header}
    >
      { children }
    </ThemedLayoutV2>
  )
}

export default Layout