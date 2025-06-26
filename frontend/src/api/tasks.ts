import customAxios from "./customAxios";

export const getAllTasks = async () => {
  return customAxios
    .get('/tasks')
    .then(res => res.data);
};

export const startTask = async (taskId: number) => {
  return customAxios.patch(`/tasks/start/${taskId}`);
};

export const endTask = async (taskId: number) => {
  return customAxios.patch(`/tasks/end/${taskId}`);
};