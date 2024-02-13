import { DragOverlay, UseDraggableArguments, useDraggable } from '@dnd-kit/core'

interface Props {
  id: string
  data?: UseDraggableArguments['data']
}

const KanbanItem = ({ children, data, id }: React.PropsWithChildren<Props>) => {
  const { attributes, listeners, setNodeRef, active } = useDraggable({
    id,
    data
  })

  return (
    <div
      style={{
        position: 'relative'
      }}
    >
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={{
          opacity: active ? (active.id === id ? 1 : 0.5) : 1,
          borderRadius: '8px',
          position: 'relative',
          cursor: 'grab'
        }}
      >
        {active?.id === id && (
          <DragOverlay>
            <div
              style={{
                borderRadius: '8px',
                boxShadow: 'rgba(149, 157, 165, 0.2) 0 8px 24px',
                cursor: 'grabbing'
              }}
            >
              { children }
            </div>
          </DragOverlay>
        )}
        {children}
      </div>
    </div>
  )
}

export default KanbanItem