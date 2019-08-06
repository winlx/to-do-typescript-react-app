import React from 'react';
import { Task as TaskType, Actions } from 'state/types';
import Task from './components/Task';

interface Props {
  tasks: TaskType[];
  dispatch: React.Dispatch<Actions>;
}

const ToDoList: React.FC<Props> = props => {
  const { tasks } = props;

  return (
    <>
      {tasks.map(task => (
        <Task key={task.id} task={task} dispatch={props.dispatch} />
      ))}
    </>
  );
};

export default ToDoList;
