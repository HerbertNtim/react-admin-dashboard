import { Avatar as AvatarDesign } from "antd"
import { AvatarProps } from "antd/lib"

type Props = AvatarProps & {
  name: string
}

const CustomAvatar = ({ name, style, ...rest }: Props) => {
  return (
    <AvatarDesign
      alt="Herbert Ntim"
      size={'default'}
      style={{
        backgroundColor: '#87d068',
        display: 'flex',
        alignItems: 'center',
        border: 'none'
      }}
    >
      {name}
    </AvatarDesign>
  )
}

export default CustomAvatar