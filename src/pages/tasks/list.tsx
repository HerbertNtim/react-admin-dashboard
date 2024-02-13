import { KanbanBoardContainer, KanbanBoard } from '@/components/tasks/kanban/board'
import ProjectCard from '@/components/tasks/kanban/card'
import KanbanColumn from '@/components/tasks/kanban/column'
import KanbanItem from '@/components/tasks/kanban/item'
import { TASKS_QUERY, TASK_STAGES_QUERY } from '@/graphql/queries'
import { TaskStage } from '@/graphql/schema.types'
import { TasksQuery } from '@/graphql/types'
import { useList } from '@refinedev/core'
import { GetFieldsFromList } from '@refinedev/nestjs-query'
import React from 'react'

const TaskList = () => {
  const { data: stages, isLoading: isLoadingStages } = useList<TaskStage>({
    resource: 'taskStages',
    filters: [
      {
        field: 'title',
        operator: 'in',
        value: ['TODO', 'IN PROGRESS', 'IN REVIEW', 'DONE']
      }
    ],
    sorters: [
      {
        field: 'createdAt',
        order: 'asc'
      }
    ],
    meta: {
      gqlQuery: TASK_STAGES_QUERY
    }
  })

  const { data: tasks, isLoading: isLoadingTasks } = useList<GetFieldsFromList<TasksQuery>>({
    resource: 'tasks',
    sorters: [
      {
        field: 'dueDate',
        order: 'asc'
      }
    ],
    queryOptions: {
      enabled: !!stages
    },
    pagination: {
      mode: 'off'
    },
    meta: {
      gqlQuery: TASKS_QUERY
    }
  })

  const taskStages = React.useMemo(() => {
    if(!tasks?.data || !stages?.data) {
      return {
        unnasignedStage: [],
        stages: []
      }
    }

    const unnasignedStage = tasks.data.filter((task) => task.stageId === null)

    const grouped: TaskStage[] = stages.data.map((stage) => ({
      ...stage,
      tasks: tasks?.data.filter((task) => task.stageId?.toString() === stage.id)
    }))

    return {
      unnasignedStage,
      column: grouped
    }
  }, [stages, tasks])

  const handleAddCard = (args: { stageId: string }) => {}

  return (
    <>
      <KanbanBoardContainer>
        <KanbanBoard>
          <KanbanColumn
            id='unnasigned'
            title={'unassigned'}
            count={taskStages.unnasignedStage.length || 0}
            onAddClick={() => handleAddCard({ stageId: 'unnasigned' })}
          >
            {taskStages.unnasignedStage.map((task) => (
              <KanbanItem
                key={task.title}
                id={task.id}
                data={{ ...task, stageId: 'unnasigned' }}
              >
                <ProjectCard
                  {...task} 
                  dueDate={task.dueDate || undefined}
                />
              </KanbanItem>
            ))}
          </KanbanColumn>
        </KanbanBoard>
      </KanbanBoardContainer>
    </>
  )
}

export default TaskList