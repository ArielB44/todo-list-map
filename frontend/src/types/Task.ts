export interface Task {
  id: number;
  content: string;
  status: TaskStatus;
  latitude?: number | null;
  longitude?: number | null;
  createdAt: string;
}

type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'DONE';