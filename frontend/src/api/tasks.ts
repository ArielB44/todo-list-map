import type { Task, TaskStatus } from "../types/Task";
import customAxios from "./customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const getTasksByStatuses = async (statuses: TaskStatus[] = []): Promise<Task[]> => {
  const response = await customAxios.post('/tasks', { statuses });
  return response.data;
};

const updateTaskStatus = async(taskId: number, status: TaskStatus) => {
  return customAxios.patch(`/tasks/status/${taskId}/${status}`);
}

export const useUpdateTaskStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, status }: { taskId: number; status: TaskStatus }) =>
      updateTaskStatus(taskId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};