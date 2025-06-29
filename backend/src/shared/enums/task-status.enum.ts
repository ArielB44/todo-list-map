export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export interface Task {
  id: number;
  content: string;
  status: TaskStatus;
  latitude: number;
  longitude: number;
  createdAt: string;
}