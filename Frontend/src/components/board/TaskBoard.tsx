import { useState, useEffect } from 'react';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';

import { CSS } from '@dnd-kit/utilities';
import { Task } from '@/types/TaskType';
import { getFormattedDate } from '@/utils/formattedDate';

import { API_URI_TASKS, getResponseError } from '@/api/actions';
import { getToken } from '@/utils/token';
import ErrorBlock from '../ui/ErrorBlock';
import { ErrorType } from '@/types/ErrorType';
import Loading from '../loading/Loading';

const TaskBoard = () => {
  const [tasks, setTasks] = useState<Task[]>();
  const [error, setError] = useState<ErrorType>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const handlerStatus = async (id: string, status: string) => {
    const url = `https://api-tasks-wmh4.onrender.com/api/tasks/status/${id}`;
    const payload = {
      status: status,
    };

    try {
      const token = getToken();
      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        getResponseError(res);
      }
    } catch (error) {
      console.error('Server error', error.msg);
    }
  };

  const fetchTasks = async () => {
    setLoading(true);
    const token = getToken();
    fetch(API_URI_TASKS, {
      headers: {
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          console.log({ code: '401', message: res.msg });
          setError(getResponseError({ status: 401, msg: res.msg }));
        } else {
          setTasks(res.data);
        }
      })
      .then(() => setLoading(false))
      .catch((error) => setError(getResponseError(error)))
      .finally(() => setLoading(false));
  };

  const Column = ({
    columnId,
    title,
    tasks,
  }: {
    columnId: string;
    title: string;
    tasks: Task[] | undefined;
  }) => {
    const { isOver, setNodeRef } = useDroppable({ id: columnId });

    return (
      <div
        ref={setNodeRef}
        style={{
          backgroundColor: 'rgb(0,0,0,0.2)',
          padding: '16px',
          borderRadius: '4px',
          minHeight: '200px',
          width: '300px',
        }}
      >
        <h3 style={{ color: isOver ? '#e30d5b' : undefined }}>{title}</h3>
        {tasks &&
          tasks.map((task: Task) => (
            <DraggableTask key={task._id} task={task} />
          ))}
      </div>
    );
  };

  const DraggableTask = ({ task }: { task: Task }) => {
    const { attributes, listeners, transform, setNodeRef } = useDraggable({
      id: task._id,
    });

    return (
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={
          transform
            ? {
                padding: '10px',
                borderRadius: '4px',
                cursor: 'grab',
                backgroundColor: '#e30d7c',
                transform: CSS.Translate.toString(transform),
              }
            : {
                padding: '5px',
                margin: '5px',
                cursor: 'grab',
                borderRadius: '4px',
                backgroundColor: '#e30d7c',
              }
        }
      >
        <h2
          style={{
            display: 'flex',
            justifyContent: 'center',
            fontFamily: 'Quicksand, sans-serif',
            fontSize: '20px',
          }}
        >
          {task.title}
        </h2>
        <h4 style={{ fontFamily: 'Quicksand, sans-serif' }}>
          {task.description}
        </h4>
        <p style={{ fontFamily: 'Quicksand, sans-serif', fontSize: '14px' }}>
          {getFormattedDate({ eventDate: task.eventDate })}
        </p>
      </div>
    );
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (tasks && over && active.id !== over.id) {
      const newTasks = tasks?.map((task) => {
        if (task._id === active.id) {
          handlerStatus(task._id, over.id);
          return { ...task, status: over.id }; // it is changed status depends on column
        }
        return task;
      });

      setTasks(newTasks);
    }
  };

  if (loading) {
    return <Loading color='#e30d7c' isLoading />;
  }

  if (error) {
    return <ErrorBlock title={error.code} message={error.message} />;
  }

  const todoTasks = tasks?.filter((task) => task.status === 'Todo');
  const runningTasks = tasks?.filter((task) => task.status === 'Running');
  const doneTasks = tasks?.filter((task) => task.status === 'Done');

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '16px',
          width: '100%',
          justifyContent: 'space-evenly',
        }}
      >
        <Column columnId='Todo' title='To Do' tasks={todoTasks} />
        <Column columnId='Running' title='Running' tasks={runningTasks} />
        <Column columnId='Done' title='Done' tasks={doneTasks} />
      </div>
    </DndContext>
  );
};

export default TaskBoard;
