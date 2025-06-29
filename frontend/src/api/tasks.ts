import type { Task, TaskStatus } from "../types/Task";
import customAxios from "./customAxios";

export const getTasksByStatuses = async (statuses: TaskStatus[] = []): Promise<Task[]> => {
  return customAxios
    .post('/tasks', { statuses })
    .then(res => res.data);
};

export const startTask = async (taskId: number) => {
  return customAxios.patch(`/tasks/start/${taskId}`);
};

export const endTask = async (taskId: number) => {
  return customAxios.patch(`/tasks/end/${taskId}`);
};