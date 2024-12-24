export interface Task {
  id: string;
  title: string;
  description: string;
  created_at: Date;
}

export interface TaskResponse {
  tasks: Task[];
  total_count: number;
}

export interface TaskFormValue {
  title: string;
  description: string;
}
