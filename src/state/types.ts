import { ADD_TASK, EDIT_TASK, REMOVE_TASK } from './actionTypes';

export interface Task {
  id: string;
  desc: string;
  sortOrder: number;
  isFinished: boolean;
}

interface AddTaskAction {
  type: typeof ADD_TASK;
  payload: string;
}

export interface EditTaskPayload extends Partial<Task> {
  id: string;
}

interface EditTaskAction {
  type: typeof EDIT_TASK;
  payload: EditTaskPayload;
}

interface RemoveTask {
  type: typeof REMOVE_TASK;
  payload: string;
}

export type Actions = AddTaskAction | EditTaskAction | RemoveTask;
