import { TaskFormValue, TaskResponse } from './types';

export const getTasks = async () => {
  const response = await fetch('http://localhost:8000/api/v1/tasks');
  const data: TaskResponse = await response.json();
  return {
    ...data,
    tasks: data.tasks.map((task) => ({
      ...task,
      created_at: new Date(task.created_at),
    })),
  };
};

export const createTask = async (data: TaskFormValue) => {
  const response = await fetch('http://localhost:8000/api/v1/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Error creating task');
  }
  return response.json();
};

export const deleteTask = async (id: string) => {
  const response = await fetch(`http://localhost:8000/api/v1/task/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Error deleting task');
  }
  return response.json();
};
