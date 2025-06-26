export interface Task {
  id: number;
  content: string;
  status: TaskStatus;
  latitude?: number | null;
  longitude?: number | null;
  createdAt: string;
}

export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'DONE';

export const TaskStatuses = {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  DONE: 'DONE'
} as const;