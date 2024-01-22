import { Popover } from 'antd';
import CustomAvatar from '../custom-avatar';
import { useGetIdentity } from '@refinedev/core';

import { User } from 'graphql'

const CurrentUser = () => {
  const { data: user } = useGetIdentity<User>()

  return (
    <>
      <Popover
        placement='bottomRight'
        trigger={'click'}
        overlayInnerStyle={{ padding: 0 }}
        overlayStyle={{ zIndex: 999 }}
      >
        <CustomAvatar  />
      </Popover>
    </>
  )
}

export default CurrentUser