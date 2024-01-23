import { Avatar as AvatarDesign } from "antd"
import { AvatarProps } from "antd/lib"
import {getNameInitials} from '@/utilities'

type Props = AvatarProps & {
  name?: string
}

const CustomAvatar = ({ name, style, ...rest }: Props) => {
  return (
    <AvatarDesign
      alt={name}
      size={'default'}
      style={{
        backgroundColor: '#87d068',
        display: 'flex',
        alignItems: 'center',
        border: 'none',
        ...style
      }}
      {...rest}
    >
      {getNameInitials(name || '')}
    </AvatarDesign>
  )
}

export default CustomAvatar