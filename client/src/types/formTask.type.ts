import type { ITask } from '../interfaces/task';
import type { Workflow } from './workflow.type';

export type CreateTaskProps = {
    task?: ITask,
    mode: "create" | "edit";
}

export type FormValues = {
  TaskTitle: string
  TaskDescription: string
  TaskWorkflow: Workflow["code"]
  TaskBoardId: string
}
