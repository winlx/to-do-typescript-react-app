import { ADD_TASK, EDIT_TASK, REMOVE_TASK } from './actionTypes';
import { EditTaskPayload, Actions } from './types';

export function addTask(taskDesc: string): Actions {
  return {
    type: ADD_TASK,
    payload: taskDesc
  };
}

export function editTask(task: EditTaskPayload): Actions {
  return {
    type: EDIT_TASK,
    payload: task
  };
}

export function removeTask(taskId: string): Actions {
  return {
    type: REMOVE_TASK,
    payload: taskId
  };
}
