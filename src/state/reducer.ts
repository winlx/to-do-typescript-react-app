import nanoid from 'nanoid';
import { ADD_TASK, EDIT_TASK, REMOVE_TASK } from './actionTypes';
import { Actions, Task } from './types';

interface State {
  [key: string]: Task;
}

export const initialState: State = {};

export default function reducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ADD_TASK: {
      const arr = Object.values(state);
      arr.sort((a, b) => a.sortOrder - b.sortOrder);
      const sortOrder: number = arr.length
        ? arr[arr.length - 1].sortOrder + 1
        : 1;
      const taskId = nanoid();

      return {
        ...state,
        [taskId]: {
          id: taskId,
          desc: action.payload,
          sortOrder,
          isFinished: false
        }
      };
    }

    case EDIT_TASK: {
      const newState = { ...state };
      newState[action.payload.id] = {
        ...newState[action.payload.id],
        ...action.payload
      };

      return newState;
    }

    case REMOVE_TASK: {
      const newState = { ...state };
      delete newState[action.payload];

      return newState;
    }

    default:
      return state;
  }
}
