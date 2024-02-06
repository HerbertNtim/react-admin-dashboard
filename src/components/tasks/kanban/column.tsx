import { useDroppable } from "@dnd-kit/core"
import { Badge, Button, Space } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import { Text } from "@/components/text"

const KanbanColumn = ({ children }: React.PropsWithChildren) => {
  const { isOver, setNodeRef, active } = useDroppable({
    id: '',
    data: ''
  })

  const count = 3
  const description = 'Description'
  const title = 'Title'

  const onAddClickHandler = () => {}

  return (
    <div
      ref={setNodeRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '0 16px'
      }}
    >
      <div
        style={{
          padding: '12px',
          height: '100vh',
        }}
      >
        <Space style={{ width: '100%', justifyContent: 'space-between'}}>
          <Space>
            <Text
              ellipsis={{ tooltip: title }}
              strong
              size='xs'
              style={{
                textTransform: 'uppercase',
                whiteSpace: 'nowrap'
              }}
            >
              {title}
            </Text>
          </Space>
          {!!count && <Badge count={count} color="cyan" />}
          <Button
            shape="circle"
            icon={<PlusOutlined />}
            onClick={onAddClickHandler}
          />
        </Space>
        {description}
      </div>
      <div
        style={{
          flex: 1,
          overflow: active ? 'unset' : 'scroll',
          border: '2px dashed transparent',
          borderColor: isOver ? '#00040' : 'transparent',
          borderRadius: '4px'
        }}
      >
        <div
          style={{
            marginTop: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export default KanbanColumn