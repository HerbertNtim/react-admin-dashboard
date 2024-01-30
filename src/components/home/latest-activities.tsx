import { Card, List } from 'antd'
import React from 'react'
import { Text } from '../text'
import { UnorderedListOutlined } from '@ant-design/icons'
import LatestActivitiesSkeleton from '../skeleton/latest-activities'

const LatestActivities = () => {
  const isLoading = true

  return (
    <Card
      bodyStyle={{ padding: '0 1rem' }}
      headStyle={{ padding: '16px' }}
      title={(
        <div 
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          <UnorderedListOutlined />
          <Text size='md' style={{ marginLeft: '0.5rem' }}>
            Latest Activities
          </Text>
        </div>
      )}
    >
      {isLoading ? (
        <List 
          itemLayout='horizontal'
          dataSource={Array.from({ length: 5 }).map((_, i) => ({ id: i}))}
          renderItem={(_, index) => (
            <LatestActivitiesSkeleton key={index} />
          )}
        />
      ): (
        <List />
      )}
    </Card>
  )
}

export default LatestActivities