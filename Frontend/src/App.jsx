/* eslint-disable react/prop-types */
import { useState } from 'react'
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core'

import { CSS } from '@dnd-kit/utilities'

const initialTasks = [
  { id: '1', text: 'Task 1', status: 'Todo' },
  { id: '2', text: 'Task 2', status: 'Running' },
  { id: '3', text: 'Task 3', status: 'Done' },
  { id: '4', text: 'Task 4', status: 'Done' }
]

const Column = ({ id, title, tasks }) => {
  const { isOver, setNodeRef } = useDroppable({ id })

  return (
    <div
      ref={setNodeRef}
      style={{
        border: '1px solid black',
        padding: '10px',
        margin: '10px',
        width: '200px',
        backgroundColor: 'blue',
        color: isOver ? 'green' : undefined
      }}>
      <h3>{title}</h3>
      {tasks.map((task) => (
        <DraggableTask key={task.id} task={task} />
      ))}
    </div>
  )
}

const DraggableTask = ({ task }) => {
  const { attributes, listeners, transform, setNodeRef } = useDraggable({ id: task.id })

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={
        transform
          ? {
              padding: '5px',
              border: '1px solid gray',
              margin: '5px',
              cursor: 'grab',
              backgroundColor: 'red',
              transform: CSS.Translate.toString(transform)
            }
          : { padding: '5px', border: '1px solid gray', margin: '5px', cursor: 'grab', backgroundColor: 'red' }
      }>
      {task.text}
    </div>
  )
}

const App = () => {
  const [tasks, setTasks] = useState(initialTasks)

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const newTasks = tasks.map((task) => {
        if (task.id === active.id) {
          return { ...task, status: over.id } // Cambia el estado según la columna
        }
        return task
      })

      setTasks(newTasks)
    }
  }

  const todoTasks = tasks.filter((task) => task.status === 'Todo')
  const inProgressTasks = tasks.filter((task) => task.status === 'Running')
  const finishedTasks = tasks.filter((task) => task.status === 'Done')

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={{ display: 'flex' }}>
        <Column id='Todo' title='To Do' tasks={todoTasks} />
        <Column id='Running' title='In Progress' tasks={inProgressTasks} />
        <Column id='Done' title='Finished' tasks={finishedTasks} />
      </div>
    </DndContext>
  )
}

export default App
